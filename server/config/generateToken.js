import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({id}, 'test', {
        expiresIn: '10 days',
    });
};

export default generateToken;