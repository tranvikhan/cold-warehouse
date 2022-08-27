import { Cookies } from 'react-cookie';
const setRoomCookieDefault = (room) => {
    let cookies = new Cookies();
    if (room) {
        cookies.set('currentRoom', JSON.stringify(room), { path: '/' });
    } else {
        cookies.remove('currentRoom', { path: '/' });
    }
};
const getRoomCookieDefault = ()=>{
    const cookies = new Cookies();
    const room = cookies.get('currentRoom');
    let roomDefault= room ? (typeof room == 'object' ? room : JSON.parse(room)) : null;
    return roomDefault;
}
export { setRoomCookieDefault, getRoomCookieDefault };