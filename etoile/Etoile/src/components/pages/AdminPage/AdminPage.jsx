import React from "react";
import { FaRegImage } from "react-icons/fa";

export default function AdminPage() {
    const [form, setForm] = React.useState({
        productName: "",
        productCode: "",
        productUrl: "",
        brandId: "",
        catigoryId: "",
        img: "",
        price: ""
    });

    const onChange = (key) => setForm({ form, [key]: e.target.value });
    async function submit() {
        try {
            const body = form;
            console.log(body);
            const request = await fetch("http://localhost:3001/AddProducts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            console.log(request);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div style={{ marginTop: "30px" }}>
            <form onSubmit={submit}>
                <fieldset style={{ width: '30%', margin: 'auto' }}>
                    <legend>Please Add a Product</legend>
                    <label htmlFor="productName">product Name</label>
                    <input type="text" id="productName" name="productName" value={form.productName} onChange={onchange("productName")} />
                    <br />
                    <label htmlFor="productCode">product Code</label>
                    <input type="text" id="productCode" name="productCode" value={form.productCode} onChange={onchange("productCode")} />
                    <br />
                    <label htmlFor="Image">product Url</label>
                    <input type="text" id="productUrl" name="productUrl" value={form.productUrl} onChange={onchange("productUrl")} />
                    <br />
                    <label htmlFor="brandId">brand Id</label>
                    <input type="text" id="brandId" name="brandId" value={form.brandId} onChange={onchange("brandId")} />
                    <br />
                    <label htmlFor="catigoryId">catigory Id</label>
                    <input type="text" id="catigoryId" name="catigoryId" value={form.catigoryId} onChange={onchange("catigoryId")} />
                    <br />
                    <label htmlFor="img">image</label>
                    <input type="text" id="img" name="img" value={form.img} onChange={onchange("img")} />
                    <br />
                    <label htmlFor="price">price</label>
                    <input type="text" id="price" name="price" value={form.price} onChange={onchange("price")} />
                    <br />
                    <input type="submit" value="Add" />
                </fieldset>
            </form>
        </div>
    )
}