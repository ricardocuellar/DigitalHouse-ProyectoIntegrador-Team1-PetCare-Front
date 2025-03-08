import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import AdminService from "./AdminService";
import warningImg from '../../images/warning.png';
import AdminCategory from "./AdminCategory";

import "../../styles/admin/adminHome.css";
import AdminUser from "./AdminUser";

function AdminHome() {
  const { auth } = useContext(AuthContext);
  const [selectedMenu, setSelectedMenu] = useState(() => {
    return localStorage.getItem('adminSelectedMenu') || null;
  });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth <= 768
  });

  useEffect(() => {
    if (selectedMenu) {
      localStorage.setItem('adminSelectedMenu', selectedMenu);
    } else {
      localStorage.removeItem('adminSelectedMenu');
    }
  }, [selectedMenu]);

  // Verificar dimensiones
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width <= 768;
      setDimensions({ width, isMobile });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getInitials = (nombre, apellido) => {
    const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : "";
    const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  const handleMenuClick = (menu) => {
    if (menu === selectedMenu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
    }
  };

  if (!auth.token) {
    return (
      <div className="admin-home-container">
        <div className="admin-welcome-card">
          <h2>Cargando...</h2>
        </div>
      </div>
    );
  }

  // Verificar si debemos mostrar el warning
  const shouldShowWarning = dimensions.isMobile && auth?.role === 'ADMIN';

  // Vista inicial del panel de administración
  if (!selectedMenu) {
    return (
      <main>
        {shouldShowWarning && (
          <div 
            style={{
              position: 'fixed',
              top: 'var(--header-height)',
              left: 0,
              right: 0,
              bottom: 'var(--footer-height)',
              backgroundColor: '#ffffff',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            <img 
              src={warningImg}
              alt="Warning" 
              style={{
                width: '80px',
                height: '80px',
                marginBottom: '1.5rem'
              }}
            />
            <span 
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#314549'
              }}
            >
              NO DISPONIBLE PARA MOBILE
            </span>
          </div>
        )}

        <div style={{ display: shouldShowWarning ? 'none' : 'block' }}>
          <div className="admin-navigation">
            <Link to="/" className="breadcrumb-link">
              Inicio
            </Link>
            <span className="breadcrumb-separator"> {">"} </span>
            <span className="breadcrumb-current">Administración</span>
          </div>

          <div className="admin-home-container">
            <div className="admin-welcome-card">
              <h1 className="welcome-title">
                ¡Hola {auth.nombre} {auth.apellido}!
              </h1>
              <div className="admin-initials-circle">
                {getInitials(auth.nombre, auth.apellido)}
              </div>
              <div className="admin-menu-links">
                <button
                  className="admin-link"
                  onClick={() => handleMenuClick("productos")}
                >
                  Lista de Productos
                </button>
                <button
                  className="admin-link"
                  onClick={() => handleMenuClick("usuarios")}
                >
                  Lista de Usuarios
                </button>
                <button
                  className="admin-link"
                  onClick={() => handleMenuClick("categorias")}
                >
                  Lista de Categorías
                </button>
                <button
                  className="admin-link"
                  onClick={() => handleMenuClick("caracteristicas")}
                >
                  Lista de Características
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Vista con menú lateral y contenido dinámico
  return (
    <main>
      <AdminLayout 
        onMenuClick={handleMenuClick}
        shouldShowWarning={shouldShowWarning}
        selectedMenu={selectedMenu}
      >
	      {selectedMenu === "productos" && (
					<AdminService isInAdminLayout={true} />
				)}
				{selectedMenu === "usuarios" && (
					<AdminUser isInAdminLayout={true} />
				)}
				{selectedMenu === "categorias" && (
					<AdminCategory isInAdminLayout={true} />
				)}        
      </AdminLayout>
    </main>
  );
}

export default AdminHome;
