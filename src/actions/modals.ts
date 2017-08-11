export const SHOW_MODAL = 'show_modal';
export const HIDE_MODAL = 'hide_modal';


export const openModal = (modal: string) => {
  return {
    type: SHOW_MODAL,
    payload: modal
  }
};

export const closeModal = (modal: string) => {
  return {
    type: HIDE_MODAL,
    payload: modal
  }
};