import "./style.css";
import { App } from "./App";
const container = document.getElementById('container')
if (!container) throw new Error("The container does not exist");
const app = new App(container);
app.init()
