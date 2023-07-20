function Message() {

    //JSX JavaScript in XML
    const name = 'Ale';
    if(name){
        return <h1>Hello {name}!</h1>
    } else {
        return <h1>Hello world!</h1>
    }
}

export default Message;
