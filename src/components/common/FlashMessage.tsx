import store from "../../store/index";
import { triggerSnakeBar } from "../../reducers/common/snakeBar.reducer";

interface IFlashMessageOptions {
  position?: "top-right" | "top-center";
  autoClose?: number;
  icon?: string;

  [key: string]: any;
}

export const FlashMessage = (message: string = "", flashType?: "info" | "success" | "warning" | "error" | "users-success", options: IFlashMessageOptions = {}) => {

  // Dispatch the snake bar
  if (message) {
    store.dispatch(triggerSnakeBar({
      show: true,
      message,
      icon: options.icon || "",
      type: (flashType || "success")
    }));
  }
}

export default FlashMessage;
