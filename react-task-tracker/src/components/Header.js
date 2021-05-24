

const Header = ({title,onAdd,text,color}) => {
    return (
        <div>
        <header className='header'>
        <h1>{title}<button type='text' style={{ backgroundColor:color}} onClick = {onAdd}>{text}</button></h1>
        </header>
        </div>
    )
}

export default Header
