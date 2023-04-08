import {Schema, model} from 'mongoose';
import type {susImagesTypes} from '@/server/types/images'

const ImagesSchema = new Schema<susImagesTypes>({
    susImage:{
        url: String,
        public_id: String,
    },
    nsfw: {
        type: Boolean,
        default: false
    }, 
}, {timestamps: true})

const ImageModel = model("images", ImagesSchema);
export default ImageModel;