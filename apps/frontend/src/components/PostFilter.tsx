type postFilterProps = {
    field: string;
};

export function PostFilter({ field }: postFilterProps) {
    const id = `filter-${field}`;
    return (
        <div>
            <label htmlFor={id}>{field}:</label>
            <input type='text' id={id} name={id} />
        </div>
    );
}
