using System.Linq.Expressions;

namespace Api.Interfaces
{
    /// <summary>
    /// Generic repository interface for common CRUD operations
    /// </summary>
    /// <typeparam name="T">The entity type</typeparam>
    public interface IRepository<T> where T : class
    {
        /// <summary>
        /// Gets all entities
        /// </summary>
        /// <returns>Collection of entities</returns>
        Task<IEnumerable<T>> GetAllAsync();

        /// <summary>
        /// Gets all entities with pagination
        /// </summary>
        /// <param name="pageNumber">Page number (1-based)</param>
        /// <param name="pageSize">Number of items per page</param>
        /// <returns>Paginated collection of entities</returns>
        Task<IEnumerable<T>> GetAllAsync(int pageNumber, int pageSize);

        /// <summary>
        /// Gets entities with filtering, ordering, and including related data
        /// </summary>
        /// <param name="filter">Filter expression</param>
        /// <param name="orderBy">Order by function</param>
        /// <param name="includeProperties">Related properties to include (comma-separated)</param>
        /// <returns>Filtered and ordered collection of entities</returns>
        Task<IEnumerable<T>> GetAsync(
            Expression<Func<T, bool>>? filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            string includeProperties = "");

        /// <summary>
        /// Gets an entity by its ID
        /// </summary>
        /// <param name="id">Entity ID</param>
        /// <returns>Entity if found, null otherwise</returns>
        Task<T?> GetByIdAsync(object id);

        /// <summary>
        /// Gets an entity by ID with related data
        /// </summary>
        /// <param name="id">Entity ID</param>
        /// <param name="includeProperties">Related properties to include (comma-separated)</param>
        /// <returns>Entity with related data if found, null otherwise</returns>
        Task<T?> GetByIdAsync(object id, string includeProperties);

        /// <summary>
        /// Gets the first entity matching the filter
        /// </summary>
        /// <param name="filter">Filter expression</param>
        /// <param name="includeProperties">Related properties to include (comma-separated)</param>
        /// <returns>First matching entity or null</returns>
        Task<T?> GetFirstOrDefaultAsync(
            Expression<Func<T, bool>> filter,
            string includeProperties = "");

        /// <summary>
        /// Checks if any entity matches the filter
        /// </summary>
        /// <param name="filter">Filter expression</param>
        /// <returns>True if any entity matches, false otherwise</returns>
        Task<bool> AnyAsync(Expression<Func<T, bool>> filter);

        /// <summary>
        /// Gets count of entities matching the filter
        /// </summary>
        /// <param name="filter">Filter expression</param>
        /// <returns>Number of matching entities</returns>
        Task<int> CountAsync(Expression<Func<T, bool>>? filter = null);

        /// <summary>
        /// Adds a new entity
        /// </summary>
        /// <param name="entity">Entity to add</param>
        /// <returns>Added entity</returns>
        Task<T> AddAsync(T entity);

        /// <summary>
        /// Adds multiple entities
        /// </summary>
        /// <param name="entities">Entities to add</param>
        Task AddRangeAsync(IEnumerable<T> entities);

        /// <summary>
        /// Updates an existing entity
        /// </summary>
        /// <param name="entity">Entity to update</param>
        void Update(T entity);

        /// <summary>
        /// Updates multiple entities
        /// </summary>
        /// <param name="entities">Entities to update</param>
        void UpdateRange(IEnumerable<T> entities);

        /// <summary>
        /// Removes an entity
        /// </summary>
        /// <param name="entity">Entity to remove</param>
        void Remove(T entity);

        /// <summary>
        /// Removes an entity by ID
        /// </summary>
        /// <param name="id">ID of entity to remove</param>
        Task RemoveByIdAsync(object id);

        /// <summary>
        /// Removes multiple entities
        /// </summary>
        /// <param name="entities">Entities to remove</param>
        void RemoveRange(IEnumerable<T> entities);

        /// <summary>
        /// Executes raw SQL query
        /// </summary>
        /// <param name="sql">SQL query</param>
        /// <param name="parameters">Query parameters</param>
        /// <returns>Collection of entities</returns>
        Task<IEnumerable<T>> FromSqlRawAsync(string sql, params object[] parameters);
    }
}
