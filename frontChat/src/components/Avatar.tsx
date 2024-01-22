export default function Avatar({userId, username}) {

    const colors = ['bg-red-200', 'bg-green-200', 'bg-purple-200', 
                    'bg-blue-200', 'bg-yellow-200', 'bg-orange-200'];

    const userIdB10 = parseInt(userId, 16);
    const color = colors[userIdB10 % colors.length];       

    return (
        <div className={"w-8 h-8 rounded-full  flex items-center "+color}>
            <div className="text-center w-full opacity-70">
                {username[0]}
            </div>
        </div>
    );
}