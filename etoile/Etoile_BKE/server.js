const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
const cors = require("cors");
const db = require('./src/Database/connection');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var path = require("path");
const { fail } = require("assert");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => { console.log(`listening http://localhost:${PORT}`) })

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3002']
}));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/Products", async (request, response) => {

    try {
        const data = await db.query(`SELECT * FROM products`);

        response.send(data.rows)
    }
    catch (err) {
        response.status(500).send(`<h1>${err}</h1>`);
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const data = await db.query('SELECT * FROM products WHERE id = $1', [productId])
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


app.get("/Makeup", async (req, res) => {
    try {
        const cat = await db.query(`SELECT * FROM products WHERE catigoryId = 1`);
        res.send(cat.rows);
    } catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
})


app.get("/SkinCare", async (req, res) => {
    try {
        const cat = await db.query(`SELECT * FROM products WHERE catigoryId = 3`);
        res.send(cat.rows);
    } catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
})

app.get("/Tools&Brushes", async (req, res) => {
    try {
        const cat = await db.query(`SELECT * FROM products WHERE catigoryId = 4`);
        res.send(cat.rows);
    } catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
})

app.get("/Fragrance", async (req, res) => {
    try {
        const cat = await db.query(`SELECT * FROM products WHERE catigoryId = 5`);
        res.send(cat.rows);
    } catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
})

app.get("/Bath&Body", async (req, res) => {
    try {
        const cat = await db.query(`SELECT * FROM products WHERE catigoryId = 6`);
        res.send(cat.rows);
    } catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
})

app.get("/Hair", async (req, res) => {
    try {
        const cat = await db.query(`SELECT * FROM products WHERE catigoryId = 7`);
        res.send(cat.rows);
    } catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
})

app.get("/Logout", async (req, res) => {
    try {
        res.clearCookie("userID");
        res.json("logged out");
    } catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
})

app.get("/Reviews", async (req, res) => {
    try {
        const user_id = req.cookies.userID;
        const rev = await db.query(`SELECT * FROM reviews `);
        res.send(rev.rows);
    } catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
})

app.post("/AddProductToCart", async (request, response) => {
    const user_id = request.cookies.userID;
    const product = request.body.product;
    try {
        if (!user_id) {
            response.json({ status: false, message: "Please Login to Add products to the cart" });
        }
        else {
            const data = await db.query(`SELECT * FROM cart where productid = $1 and user_id = $2`,
                [product.id, user_id]);
            console.log("testData", data.rows);
            if (data.rows.length === 0) {
                console.log("ERROR1");
                await db.query(
                    `INSERT INTO cart (user_id, productid, quantity ) VALUES ($1, $2, $3) RETURNING *`,
                    [user_id, product.id, 1]
                );
                response.json({ status: true });
            }
            else if (data.rows.length > 0) {
                let Currentquantity = data.rows.find((element) => element.quantity);
                console.log("test1", Currentquantity);
                Currentquantity.quantity += 1;
                console.log("test1", Currentquantity.quantity);
                await db.query(
                    `update cart set quantity=$1 where user_id = $2  and productid = $3 `,
                    [Currentquantity.quantity, user_id, product.id]);
            }
            else {
                response.json({ status: true });
            }
        }
    } catch (err) {
        console.log(err);
    }
});

app.get("/Cart", async (req, res) => {
    try {
        // let userid = req.cookies("userId");
        // let user_id = req.cookies.userID.find((element) => element);
        const user_id = req.cookies.userID;
        let dbdata = await db.query(
            `SELECT * FROM cart as c inner join products as p on c.productId= p.id where c.user_id=$1`, [user_id]
        );
        res.json(dbdata.rows);
    } catch (error) {
        console.log(error);
    }
});

app.post("/Cart", async (req, res) => {
    try {
        // let user_id = req.cookies.userID.find((element) => element);
        console.log(req.body);
        const user_id = req.cookies.userID[0];
        const key = req.body.key;
        console.log(1, user_id);
        if (req.body.flag === "update") {
            console.log("Hi,I'm hereeeee :)");
            const quantity = req.body.quantity;
            await db.query(
                `UPDATE Cart SET quantity=${quantity} WHERE user_id=${user_id} AND productId=${key}`
            );
        } else if (req.body.flag === "delete") {
            console.log("I'm going to delete this prouduct :((((");
            await db.query(
                `DELETE FROM cart where productId=${key} AND user_id=${user_id}`
            );
        } else if (req.body.flag === "updateOrderTable") {
            const cart = await db.query(
                `select productid, quantity from cart where user_id=${user_id}`
            );
            // await db.query(`DELETE FROM cart where user_id=${user_id}`);
            const Total = req.body.total;
            const date = new Date();
            const stringdate = date.toISOString();
            console.log("teest!!", stringdate);
            await db.query(
                `INSERT INTO orders(orderdate, id_user, price) VALUES($1 ,$2 ,$3)`,
                [stringdate, user_id, Total]
            );
            const orderid = await db.query(
                `select id from orders where id_user=$1 AND orderdate=$2`,
                [user_id, stringdate]
            );
            console.log("order", orderid.rows[0].id);
            console.log("cart", cart.rowCount);
            for (let i = 0; i < cart.rowCount; i++) {
                await db.query(
                    `INSERT INTO ordersDetails(productId,orderId,quantity) VALUES($1,$2,$3)`,
                    [cart.rows[i].productid, orderid.rows[0].id, cart.rows[i].quantity]
                );
            }
            await db.query(`DELETE FROM cart where user_id=${user_id}`);
        }
    } catch (error) {
        console.log(error);
    }
});

app.get("/signup", async (req, res) => {
    let users = await db.query('SELECT * FROM users');
    res.json(users);
});

app.get("/login", async (req, res) => {
    let users = await db.query('SELECT * FROM users');
    res.json(users);
});


app.get("/adminlog", async (req, res) => {
    let admins = await db.query('SELECT * FROM admins');
    res.json(admins);
});

app.get("/popup", async (req, res) => {
    let key = await db.query('SELECT adminKey FROM admins');
    res.json(key);
});

app.get("/payment", async (req, res) => {
    try {
        console.log(req.cookies.userID.find((element) => element), "cookies in payment");
        res.json({})
    }
    catch (error) {
        console.log(error);
    }
});

app.post("/signup", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        bcrypt
            .hash(password, saltRounds)
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        let newuser = await db.query(`INSERT INTO users (username, userPassword, email) VALUES ($1, $2, $3) RETURNING *`, [username, hash, email])
        res.json(newuser.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send(`not found`)
    }
});

app.post("/Reviews", async (req, res) => {
    try {
        const review = req.body;
        const user_id = req.cookies.userID;
        const date = new Date();
        console.log(review);
        if (!user_id) {
            res.clearCookie("userID")
            response.json({ status: false, message: "Please Login to Add your review" });
        }
        let newrev = await db.query(`INSERT INTO reviews (user_id, review, posttime) VALUES ($1, $2, $3) RETURNING *`, [user_id, review, date])
        res.json(newrev);
    } catch (err) {
        res.status(500).send(`not found`)
    }

})

app.post('/login', async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        console.log(email, password);
        let userPassword = await db.query(`SELECT * FROM users WHERE email = $1 `, [email]);
        let pass = userPassword.rows.map(e => e.userpassword);
        let userid_arr = userPassword.rows.map(e => e.id);
        let user_id = userid_arr[0];
        let users = await db.query(`SELECT email FROM users WHERE email = $1 `, [email]);
        let newusers = users.rows.map(e => e.email);
        let comparepass = await bcrypt.compare(password, pass[0]);
        if (newusers.length === 0) {
            res.json({ status: false, message: "something..." });
        }
        else if (newusers[0] === users.rows[0].email && comparepass === true) {
            res.cookie("userID", user_id, { maxAge: 18000000 });
            res.json({ status: true, message: "welcome.." });
        } else {
            res.json({ status: false, message: "try again" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(`not found`)
    }
});

app.post("/adminlog", async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let info = await db.query('SELECT * FROM admins WHERE userName = $1 AND adminPassword = $2', [username, password]);
        if (info.rows[0] == null) {
            return res.status(401).json({ error: "incorrect username or password" });
        }
        else {
            let data = info.rows[0];
            let adminId = data.id;
            res.cookie("adminID", adminId, { maxAge: 18000000 })
            res.json({ status: true, message: "welcome.." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`not found`)
    }
});

app.post("/popup", async (req, res) => {
    try {
        let adminkey = req.body.adminkey;
        let info = await db.query('SELECT * FROM admins WHERE adminKey = $1', [adminkey]);
        if (info.rows[0] == null) {
            return res.status(401).json({ error: "incorrect Key" });
        } else {
            res.json({ status: true, message: "welcome.." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`not found`)
    }
});