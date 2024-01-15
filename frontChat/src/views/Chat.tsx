export default function Chat() {
    return (
        <div className="flex h-screen">
            <div className="bg-white-100 w-1/3">
                Contacts
            </div>
            <div className="flex flex-col bg-blue-300 w-2/3 p-2">
                <div className="flex-grow">
                    Messages
                </div>
                <div className="flex gap-2 mx-2">
                    <input type="text" 
                        placeholder="Type your message here"
                        className="bg-white flex-grow border p2"/>
                    <button className="bg-blue-500 p-2 text-white">
                        icon
                    </button>
                </div>
                
            </div>
        </div>
    );
}