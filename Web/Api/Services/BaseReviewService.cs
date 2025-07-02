using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Api.Services
{
    public abstract class BaseReviewService<TEntity, TDto> : IReview<TDto>
        where TEntity : class
        where TDto : class
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IMapper _mapper;
        protected readonly IRepository<TEntity> _repository;

        protected BaseReviewService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _repository = _unitOfWork.Repository<TEntity>();
        }

        public virtual async Task<List<TDto>> allAsync()
        {
            try
            {
                var entities = await _repository.GetAsync(
                    orderBy: q => q.OrderByDescending(GetCreatedAtSelector()),
                    includeProperties: GetIncludeProperties()
                );
                return _mapper.Map<List<TDto>>(entities);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error retrieving reviews: {ex.Message}");
            }
        }

        public virtual async Task<List<TDto>> allByObjectAsync(int objectId)
        {
            try
            {
                var entities = await _repository.GetAsync(
                    filter: GetObjectFilterExpression(objectId),
                    orderBy: q => q.OrderByDescending(GetCreatedAtSelector()),
                    includeProperties: GetIncludeProperties()
                );
                return _mapper.Map<List<TDto>>(entities);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error retrieving reviews by object: {ex.Message}");
            }
        }

        public virtual async Task<double> averageRating(int objectId)
        {
            try
            {
                var entities = await _repository.GetAsync(
                    filter: GetObjectFilterExpression(objectId)
                );

                if (!entities.Any())
                {
                    return 0.0;
                }

                var ratings = entities.Select(GetRatingSelector().Compile());
                return Math.Round(ratings.Average(), 1);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error calculating average rating: {ex.Message}");
            }
        }

        public virtual async Task<TDto> createAsync(TDto reviewDto)
        {
            try
            {
                // Check for duplicate review if implemented by derived class
                await ValidateUniqueReview(reviewDto);

                var entity = _mapper.Map<TEntity>(reviewDto);
                await _repository.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return _mapper.Map<TDto>(entity);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error creating review: {ex.Message}");
            }
        }

        public virtual async Task<string> deleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                {
                    throw new Exceptions.ServiceException($"{GetEntityName()} review not found");
                }

                _repository.Remove(entity);
                await _unitOfWork.SaveChangesAsync();
                return $"{GetEntityName()} review deleted successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error deleting review: {ex.Message}");
            }
        }

        public virtual async Task<TDto> findAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id, GetIncludeProperties());
                if (entity == null)
                {
                    throw new Exceptions.ServiceException($"{GetEntityName()} review not found");
                }

                return _mapper.Map<TDto>(entity);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error finding review: {ex.Message}");
            }
        }

        public virtual async Task<object> reviewStats(int objectId)
        {
            try
            {
                var entities = await _repository.GetAsync(
                    filter: GetObjectFilterExpression(objectId)
                );

                if (!entities.Any())
                {
                    return new { totalReviews = 0, averageRating = 0.0 };
                }

                var ratings = entities.Select(GetRatingSelector().Compile());
                var totalReviews = entities.Count();
                var averageRating = Math.Round(ratings.Average(), 1);

                return new
                {
                    totalReviews = totalReviews,
                    averageRating = averageRating
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error calculating review stats: {ex.Message}");
            }
        }

        public virtual async Task<TDto> updateAsync(int id, TDto reviewDto)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                {
                    throw new Exceptions.ServiceException($"{GetEntityName()} review not found");
                }

                _mapper.Map(reviewDto, entity);
                SetUpdatedAt(entity);

                _repository.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                return _mapper.Map<TDto>(entity);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error updating review: {ex.Message}");
            }
        }

        public virtual async Task<PagedList<TDto>> GetAllPaginatedAsync(int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                var totalCount = await _repository.CountAsync();
                var entities = await _repository.GetAllAsync(pageNumber, pageSize);

                var dtos = _mapper.Map<List<TDto>>(entities);
                return new PagedList<TDto>(dtos, totalCount, pageNumber, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error retrieving paginated reviews: {ex.Message}");
            }
        }

        public virtual async Task<PagedList<TDto>> GetByObjectPaginatedAsync(int objectId, int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                var filter = GetObjectFilterExpression(objectId);
                var totalCount = await _repository.CountAsync(filter);

                var entities = await _repository.GetAsync(
                    filter: filter,
                    orderBy: q => q.OrderByDescending(GetCreatedAtSelector()),
                    includeProperties: GetIncludeProperties()
                );

                // Apply pagination manually since GetAsync doesn't support pagination
                var pagedEntities = entities
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var dtos = _mapper.Map<List<TDto>>(pagedEntities);
                return new PagedList<TDto>(dtos, totalCount, pageNumber, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error retrieving paginated reviews by object: {ex.Message}");
            }
        }

        // Abstract methods to be implemented by derived classes
        protected abstract Expression<Func<TEntity, bool>> GetObjectFilterExpression(int objectId);
        protected abstract Expression<Func<TEntity, DateTime>> GetCreatedAtSelector();
        protected abstract Expression<Func<TEntity, double>> GetRatingSelector();
        protected abstract string GetIncludeProperties();
        protected abstract string GetEntityName();
        protected abstract void SetUpdatedAt(TEntity entity);
        protected abstract Task ValidateUniqueReview(TDto reviewDto);
    }
}
