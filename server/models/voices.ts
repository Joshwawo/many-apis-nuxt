import {Schema, model} from 'mongoose';
import {resVoices} from '../types/voices';



const newVoicesSchema = new Schema<resVoices>({
  failed_at:{
    type: String,
  },
  finished_at:{
    type: String,
  },
  meta:{
    duration:{
      type: Number,
    },
    pace:{

    },
    pitch:{
      type: Number,
    },
    voice:{
      type: String,
    },
    voicemodel_uuid:{
      type: String 
    }
  },
  path:{
    type: String,
  },
  started_at:{
    type: String,
  },
  voice_actor:{
    type: String,
  },
  display_voice:{
    type: String,
  },
  uuid:{
    type: String,
  },
  tts:{
    type: String,
  }
},
{
  timestamps: true,
  
}
)
const NewVoicesModel = model('NewVoices', newVoicesSchema);
export default NewVoicesModel;