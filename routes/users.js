const { userCreate, getUsers, removeUser, modifyUser, userLogin } = require('../Controllers/user');

// Toutes les routes pour users

function usersRoute(app) {
    // Create user
    app.post('/userCreate', userCreate);

    // Get users
    app.get('/users', getUsers);

    // Modify user
    app.put('/userModify', modifyUser);

    // Delete user
    app.delete('/userDelete', removeUser);

    // Create user
    app.post('/userLogin', userLogin);
}

module.exports = usersRoute;
