export default function FormPages({title,placeholder}){
    return(
        <>
        <form action="">
            <label htmlFor="">{title}</label>
            <input type="text" placeholder={placeholder} />
        </form>
        </>
    )
}