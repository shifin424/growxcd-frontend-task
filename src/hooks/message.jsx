import { message } from 'antd';

export const successMessage = (text) => {
    message.success(text)
}

export const errorMessage = (text) => {
    message.error(text)
}

export const infoMessage = (text) => {
    message.info(text)
}

export const warningMessage = (text) => {
    message.warning(text)
}