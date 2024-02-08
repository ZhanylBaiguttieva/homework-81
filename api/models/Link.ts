import {Schema, model} from 'mongoose';

const LinkSchema = new Schema({
    shortUrl: String,
    originalUrl: {
        type: String,
        required: true,
    }
});

const Link = model('Link', LinkSchema);

export default Link;