import {BrowserRouter, Route, Routes} from "react-router-dom";
import Wrapper from "./layouts/Wrappers";
import {HomeLayout} from "./layouts/HomeLayout";
import {AdminLayout} from "./layouts/AdminLayout";
import {Admin} from "./pages/admin/Admin";
import {Category} from "./pages/admin/Category";
import {Login} from "./pages/Login";
import {Product} from "./pages/admin/Product";
import {Aware} from "./pages/admin/Aware";
import {AuthLayout} from "./layouts/AuthLayout";
import {NotFound} from "./pages/NotFound";
import {ZakazItem} from "./pages/ZakazItem";
import {Register} from "./pages/Register";
import {UserLayout} from "./layouts/UserLayout";


function App() {
    return (
        <BrowserRouter>
            <Wrapper>
                <Routes>
                    <Route path="/" element={<HomeLayout/>}>
                    </Route>
                    <Route path="/admin" element={<AdminLayout/>}>
                        <Route index element={<Admin/>}/>
                        <Route path="/admin/category" element={<Category/>}/>
                        <Route path="/admin/product" element={<Product/>}/>
                        <Route path="/admin/aware" element={<Aware/>}/>
                    </Route>
                    <Route path="/auth" element={<AuthLayout/>}>
                        <Route path="/auth/login" element={<Login/>}/>
                        <Route path="/auth/register" element={<Register/>}/>
                    </Route>
                    <Route path="/user" element={<UserLayout/>}>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path={"/z/:id"} element={<ZakazItem/>}/>
                </Routes>
            </Wrapper>
        </BrowserRouter>
    )
}

export default App
