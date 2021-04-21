const users = [];

const new_user = function({id, username, room}) {
    //checks and validates username
    const current_user = users.find(function(user) {
        return user.room === room && user.username === username
    })

    if(current_user) {
        return {
            error: 'username already taken!'
        }
    }

    const user = {id, username, room}
    users.push(user)
    return{user}
};

const disconnect_user = function(id) {
    const index = users.findIndex(function(user) {
        return user.id === id
    });

    if(index !== -1) {
        return users.splice(index, 1) [0]
    }
};

const get_user = function(id) {
    return users.find((user) => user.id === id)
}

module.exports = {new_user, disconnect_user, get_user}