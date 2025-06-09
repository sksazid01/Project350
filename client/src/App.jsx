import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { toggleRTL, toggleTheme, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './redux/themeConfigSlice';
import { store } from '/src/redux/store.js';
import { loadUserFromLocalStorage } from './redux/user/userActions';



// function App() {
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//       setTimeout(() => {
//           setLoading(false);
//       }, 1000);
//   }, []);

//   const renderRoutes = (routes) => routes.map((route, index) => {
//       if (route.routes) {
//           // For nested routes, render a Route component with nested routes
//           return (
//               <Route key={index} path={route.path} element={<route.component />}>
//                   {renderRoutes(route.routes)}
//               </Route>
//           );
//       }
//       return <Route key={index} path={route.path} element={<route.component />} />;
//   });

//   return (
//       <>
//           {!loading ? (
//               <BrowserRouter>
//                   <Routes>
//                       {renderRoutes(routes)}
//                       <Route path="*" element={<NotFoundPage/>} /> {/* Catch-all route */}
//                   </Routes>
//               </BrowserRouter>
//           ) : (
//               <Preloader />
//           )}
//       </>
//   );
// }

// export default App;

function App({ children }) {
    const themeConfig = useSelector((state) => state.themeConfig);
    const dispatch = useDispatch();

    useEffect(() => {
        // Load user data from localStorage on startup
        dispatch(loadUserFromLocalStorage());
        
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.semidark]);

    return (
        <div
            className={`App ${themeConfig.theme} ${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section antialiased relative font-nunito text-sm font-normal`}
        >
            {children}
        </div>
    );
}

export default App;
