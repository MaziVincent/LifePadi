import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Loader2, Trash2 } from "lucide-react";

import usePost from "../../../../hooks/usePost";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CategoryLite {
	Id: number | string;
	Name: string;
}

interface CreateProductModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	vendorId: number | string;
}

interface OptionRow {
	name: string;
	price: string;
	isDefault?: boolean;
}

const selectClasses = cn(
	"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm capitalize ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
);

const CreateProductModal = ({
	open,
	handleClose,
	vendorId,
}: CreateProductModalProps) => {
	const post = usePost();
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}product/create`;
	const queryClient = useQueryClient();
	const [fileError, setFileError] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [variants, setVariants] = useState<OptionRow[]>([]);
	const [extras, setExtras] = useState<OptionRow[]>([]);

	const { data: categories } = useQuery<CategoryLite[]>({
		queryKey: ["categories"],
		queryFn: async () => {
			const r = await fetch(`${baseUrl}category/allLite`, auth.accessToken);
			return r.data as CategoryLite[];
		},
		staleTime: 10000,
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm({ mode: "all" });

	const create = async (payload: Record<string, any>) => {
		const fd = new FormData();
		Object.entries(payload).forEach(([k, v]) => fd.append(k, v as any));
		const res: any = await post(url, fd, auth?.accessToken);
		const productId = res?.data?.Id ?? res?.data?.id;
		if (productId) await persistOptions(productId);
	};

	const persistOptions = async (productId: number | string) => {
		const vs = variants.filter((v) => v.name && v.price);
		const xs = extras.filter((v) => v.name && v.price);
		const calls: Promise<any>[] = [];
		vs.forEach((v) =>
			calls.push(
				post(
					`${baseUrl}ProductOption/variants/create`,
					{
						ProductId: productId,
						Name: v.name,
						Price: Number(v.price),
						IsDefault: !!v.isDefault,
					},
					auth?.accessToken,
				),
			),
		);
		xs.forEach((x) =>
			calls.push(
				post(
					`${baseUrl}ProductOption/extras/create`,
					{ ProductId: productId, Name: x.name, Price: Number(x.price) },
					auth?.accessToken,
				),
			),
		);
		try {
			await Promise.all(calls);
		} catch {
			toast.error("Some options failed to save");
		}
	};

	const { mutate } = useMutation({
		mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor"] });
			toast.success("Product Created");
			handleClose({ type: "open" });
			reset();
			setFile(null);
			setVariants([]);
			setExtras([]);
		},
		onError: () => {
			toast.error("Failed to create");
		},
	});

	const onSubmit = (prod: any) => {
		mutate({ ...prod, VendorId: vendorId, Image: file });
	};

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (!f || f.size > 200 * 1024) {
			setFileError(true);
			setFile(null);
		} else {
			setFile(f);
			setFileError(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "open" })}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Create Product</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label>Name</Label>
							<Input {...register("Name", { required: true })} />
							{errors.Name && (
								<p className="text-xs text-destructive">Required</p>
							)}
						</div>
						<div className="space-y-1">
							<Label>Tag</Label>
							<Input {...register("Tag", { required: true })} />
						</div>
						<div className="space-y-1 sm:col-span-2">
							<Label>Description</Label>
							<Textarea
								rows={3}
								{...register("Description", { required: true })}
							/>
						</div>
						<div className="space-y-1">
							<Label>Price</Label>
							<Input type="number" {...register("Price", { required: true })} />
						</div>
						<div className="space-y-1">
							<Label>Category</Label>
							<select
								className={selectClasses}
								defaultValue=""
								{...register("CategoryId", {
									required: "Category is required",
								})}>
								<option value="" disabled>
									Select Category
								</option>
								{categories?.map((c) => (
									<option key={c.Id} value={c.Id}>
										{c.Name}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-1 sm:col-span-2">
							<Label>Image (max 200KB)</Label>
							<Input
								type="file"
								accept="image/*"
								{...register("Image", { required: true })}
								onChange={handleFile}
							/>
							{fileError && (
								<p className="text-xs text-destructive">
									File must be under 200KB
								</p>
							)}
							{file && <p className="text-xs text-emerald-600">{file.name}</p>}
						</div>
					</div>
					<OptionSection
						title="Variants"
						subtitle="Sizes / portions that REPLACE base price."
						items={variants}
						setItems={setVariants}
						withDefault
					/>
					<OptionSection
						title="Extras"
						subtitle="Add-ons that ADD to price."
						items={extras}
						setItems={setExtras}
					/>
					<DialogFooter>
						<Button
							type="submit"
							disabled={isSubmitting || fileError || !isValid}>
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Plus className="mr-2 h-4 w-4" />
							)}
							Create
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

interface OptionSectionProps {
	title: string;
	subtitle: string;
	items: OptionRow[];
	setItems: React.Dispatch<React.SetStateAction<OptionRow[]>>;
	withDefault?: boolean;
}

const OptionSection = ({
	title,
	subtitle,
	items,
	setItems,
	withDefault,
}: OptionSectionProps) => {
	const addRow = () =>
		setItems((xs) => [...xs, { name: "", price: "", isDefault: false }]);
	const updateRow = (i: number, patch: Partial<OptionRow>) =>
		setItems((xs) => xs.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
	const removeRow = (i: number) =>
		setItems((xs) => xs.filter((_, idx) => idx !== i));
	const setDefault = (i: number) =>
		setItems((xs) => xs.map((x, idx) => ({ ...x, isDefault: idx === i })));
	return (
		<div className="space-y-2 rounded-md border border-dashed p-3">
			<div className="flex items-start justify-between gap-2">
				<div>
					<p className="text-sm font-semibold">{title}</p>
					<p className="text-xs text-muted-foreground">{subtitle}</p>
				</div>
				<Button type="button" variant="outline" size="sm" onClick={addRow}>
					<Plus className="mr-1 h-3.5 w-3.5" /> Add
				</Button>
			</div>
			{items.length === 0 && (
				<p className="text-xs italic text-muted-foreground">None added.</p>
			)}
			<div className="space-y-2">
				{items.map((row, i) => (
					<div key={i} className="flex flex-wrap items-center gap-2">
						<Input
							placeholder="Name"
							className="min-w-[120px] flex-1"
							value={row.name}
							onChange={(e) => updateRow(i, { name: e.target.value })}
						/>
						<Input
							type="number"
							min={0}
							step="0.01"
							placeholder="Price"
							className="w-28"
							value={row.price}
							onChange={(e) => updateRow(i, { price: e.target.value })}
						/>
						{withDefault && (
							<label className="flex cursor-pointer items-center gap-1 text-xs">
								<input
									type="radio"
									checked={!!row.isDefault}
									onChange={() => setDefault(i)}
								/>{" "}
								default
							</label>
						)}
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => removeRow(i)}>
							<Trash2 className="h-4 w-4 text-destructive" />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default CreateProductModal;
