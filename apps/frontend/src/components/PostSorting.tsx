type postFilteringProps = {
    fields: string[];
};

export function PostSorting({ fields = [] }: postFilteringProps) {
    return (
        <div>
            <label htmlFor='sortBy'>Sort By:</label>
            <select name='sortBy' id='sortBy'>
                {fields.map((field) => (
                    <option key={field} value={field}>
                        {' '}
                        {field}
                    </option>
                ))}
            </select>
            {' / '}
            <label htmlFor='sortOrder'>Sort Order:</label>
            <select name='sortOrder' id='sortOrder'>
                <option value='ascending'>Ascending</option>
                <option value='descending'>Descending</option>
            </select>
        </div>
    );
}
