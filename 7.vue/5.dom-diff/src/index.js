import { h, mount, patch } from "./vdom";

const root = document.getElementById("root");

const oldVnode = h("ul", { id: "container", style: { textAlign: "center" } }, 
    h("li", { style: { backgroundColor: "#f9b", margin: "30px auto", padding: "20px", width: "400px", borderRadius: "10px", marginBottom: "10px" }, key: "a" }, "hello" ), 
    h("li", { style: { backgroundColor: "#f6b", margin: "30px auto", padding: "20px", width: "400px", borderRadius: "10px", marginBottom: "10px" }, key: "b" }, "world" ));
// console.log(oldVnode);

const newVnode = h("ul", { id: "container", style: { textAlign: "center" } }, 
  h("li", { style: { backgroundColor: "#fb7", margin: "30px auto", padding: "20px", width: "400px", borderRadius: "10px", marginBottom: "10px" }}, "Bonjour" ),
  h("li", { style: { backgroundColor: "#fb9", margin: "30px auto", padding: "20px", width: "400px", borderRadius: "10px", marginBottom: "10px" }}, "Hola" ),
  h("li", { style: { backgroundColor: "#fb5", margin: "30px auto", padding: "20px", width: "400px", borderRadius: "10px", marginBottom: "10px" }, key: "b" }, "world" ),
  h("li", { style: { backgroundColor: "#fb1", margin: "30px auto", padding: "20px", width: "400px", borderRadius: "10px", marginBottom: "10px" }, key: "a" }, "hello" ),
  h("li", { style: { backgroundColor: "#fbb", margin: "30px auto", padding: "20px", width: "400px", borderRadius: "10px", marginBottom: "10px" }}, "Commont a les vous?" ),
);
  // h("")

mount(oldVnode, root);

setTimeout(() => {
  patch(oldVnode, newVnode)
}, 3000);