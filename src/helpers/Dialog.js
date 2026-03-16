import { reactive } from "vue";

const state = reactive({
  show: false,
  buttons: [],
  message: "",
  onAction: null,
});

export default {
  state,

  open(message, buttons = [], onAction = null) {
    state.message = message;
    state.buttons = buttons;
    state.onAction = onAction;
    state.show = true;
  },

  confirm(message, onAction) {
    this.open(
      message,
      [
        { label: "Não", name: "no", color: "error" },
        { label: "Sim", name: "yes", color: "success" },
      ],
      onAction
    );
  },

  close() {
    state.show = false;
    state.message = "";
    state.buttons = [];
    state.onAction = null;
  },

  action(btn) {
    if (state.onAction) state.onAction(btn.name);
    this.close();
  },
};
