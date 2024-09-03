import { Server } from 'socket.io';

const io = new Server({
    cors: {
        origin: ['http://localhost:8081']
    }
});


const generateMessageId  = () => Math.random().toString(36).substring(2, 10);

let chatRoom = [
    {
        roomId: 'GL-01',
        roomName: 'General Chat',
        description: 'The Chat room for any and everything',
        messages : [
            {
                id:1,
                content: 'Welcome to the General Chat!',
                sent: 'N/A',
                user: 'Admin' 
            },
            {
                id:2,
                content: 'Big sale for Memorial Day',
                sent: 'N/A',
                user: 'Admin' 
            },
            {
                id:7,
                content: 'Test post for Harsh',
                sent: 'N/A',
                user: 'harsh' 
            }
        ]
    },
    {
        roomId: 'GL-02',
        roomName: 'Brands',
        description: 'The Room to talk about Brands',
        messages : [
            {
                id:3,
                content: 'Welcome to the Brand Chat!',
                sent: 'N/A',
                user: 'Admin' 
            },
            {
                id:4,
                content: 'Automotive brand in introducing a new vehicle',
                sent: 'N/A',
                user: 'Admin' 
            }
        ]
    },
    {
        roomId: 'GL-03',
        roomName: 'Robotics',
        description: 'The Chat room for Robotic discussion',
        messages : [
            {
                id:5,
                content: 'Welcome to the Robotics',
                sent: 'N/A',
                user: 'Admin' 
            },
            {
                id:6,
                content: 'New personal assistant Robot',
                sent: 'N/A',
                user: 'Admin' 
            }
        ]
    }
];

console.log('Globochat Server Started');

io.on('connection', (socket) => {
    console.log(`connect: ${socket.id}`, socket.request.headers);

    socket.on('disconnect', () => {
        console.log()`dusconnect: ${socket.id}`
    });

    socket.on('getRooms', () => {
        console.log(`returning room list: `, chatRooms);
        socket.emit('returnRooms', chatRooms);
    });

    socket.on('connectRoom', (id) => {
        let chosenRoom = chatRooms.filter((room) => room.roomId === id);
        socket.join(chosenRoom[0].roomName);
        console.log('Joined Room: ',chosenRoom[0],roomName);
        socket.emit('JoinedRoom', chosenRoom[0].messages);
    });

    socket.on('newPost', (data) => {
        const {userMessage, room_Id, sender, messageTime } =data;
        let selectedRoom = chatRooms.filter((room) => romm.roomId == room_id);
        const addMessage = {
            id: generateMessageId(),
            content: userMessage,
            sent: messageTime,
            user: sender
        }
        console.log("New post ", addMessage);
        socket.io(selectedRoom[0].roomName).emit('channelMessage', addMessage);
        selectedRoom[0].messages.push(addMessage);
        io.to(selectedRoom[0].roomName).emit('newMessage', selectedRoom[0].messages);
        console.log('Emit new message', addMessage)
    })

});
io.listen(3000);