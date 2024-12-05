import { StateCreator } from 'zustand'
import { FavoritesSliceType } from './favoritesSlice'


//tipo
export type Notification = {
    text: string
    error: boolean
    show: boolean
}

export type NotificationSliceType = {
    notification: Notification
    showNotification: (payload:Pick<Notification, 'text' | 'error'>) => void
    hideNotification: () => void

}

//slice
export const createNotificationSlice: StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set,get) => ({
    notification: {
        text: '',
        error: false,
        show: false
    },
    showNotification: (payload) => {
        set({
            notification: { ...payload, show:true }
        })
        setTimeout(() => {
            get().hideNotification()
        }, 5000)
    },
    hideNotification: () => {
        set({
            notification:{
                text:'',
                error: false,
                show: false
            }
        })
    }

    
})