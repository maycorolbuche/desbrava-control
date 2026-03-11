import { reactive } from "vue";

const state = reactive({
  show: false,
  message: "",
  color: "info",
  timeout: 3000,
  timestamp: 0,
});

export default {
  state,

  exec(data) {
    state.timestamp = data.timestamp;
    state.message = data.message;
    state.color = data.color;
    state.timeout = data.timeout;
    state.show = true;
  },

  show(message, color = "info", timeout = -1) {
    this.close();
    if (timeout == 0) {
      timeout = -1;
    }
    setTimeout(() => {
      this.exec({ message, color, timeout, timestamp: Date.now() });
    });
  },

  success(message, timeout = 4000) {
    this.show(message, "success", timeout);
  },

  error(message, timeout = 10000) {
    this.show(message, "error", timeout);
  },

  warning(message, timeout = 6000) {
    this.show(message, "warning", timeout);
  },

  info(message, timeout = 4000) {
    this.show(message, "info", timeout);
  },

  close() {
    state.show = false;
  },
};
