import { BrowserRouter, Outlet, Route, Routes, useRoutes } from "react-router-dom";
import Caption from "../features/Caption/components/Caption";
import Vocabulary from "../features/Vocabulary/components/Vocabulary";
import { Search } from "../features/Search/components/Search";
import { Favorite } from "../features/Favorite/components/Favorite";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/caption/:videoId" element={<Caption/>}/>
            <Route path="/vocabulary" element={<Vocabulary/>}/>
            <Route path="/favorite" element={<Favorite/>}/>
            <Route path="/search" element={<Search/>}/>
        </Routes>
    </BrowserRouter>
  );
};
