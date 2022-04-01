import style from './layout.module.css';

function Layout(props){
    return(
        <div>
            <div>{props.header}</div>
            <div>{props.content}</div>
            <div>{props.footer}</div>
        </div>
    )
}

export default Layout;