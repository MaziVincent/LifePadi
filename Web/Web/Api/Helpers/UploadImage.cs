
using Api.Exceptions;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Api.Helpers
{
    public static class UploadImage
    {
        public static async Task<string> uploadImg(IFormFile file, Cloudinary cloudinary, string folderName)
        {
            try
            {
                if (file != null && file.Length > 0)
                {
                    using (var stream = file.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams
                        {
                            File = new FileDescription(file.FileName, stream),
                            Folder = $"LifePadi/{folderName}"
                        };
                        var uploadResult = await cloudinary.UploadAsync(uploadParams);

                        string imgUrl = uploadResult.SecureUrl.ToString();

                        return imgUrl;
                    }
                }
                return "No file provided.";
            }catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }
    }
}
