import React from 'react'
import { Menubar } from 'primereact/menubar';

function Header() {

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url:"/"
        },
        
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'States',
                    icon: 'pi pi-bolt',
                    url:"/states"
                },
                {
                    label: 'Cities',
                    icon: 'pi pi-server',
                    url:"/cities"
                },
                {
                    label: 'Areas',
                    icon: 'pi pi-pencil',
                    url:"/areas"
                },
                {
                    label: 'Role',
                    icon: 'pi pi-palette',
                    url:"/role"
                   
                },
                {
                    label: 'RoleCategories',
                    icon: 'pi pi-palette',
                    url:"/role-categories"
                   
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];
  return (
    
            <header className="header w-full">
            <Menubar model={items}  className='w-full'/>
        </header>
        
    
  )
}

export default Header