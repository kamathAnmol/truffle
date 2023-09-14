"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import "./navbar.styles.scss";

import LoginBtn from "../loginBtn/loginBtn";
import RegisterBtn from "../registerBtn/registerBtn";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/root-reducer";
import SignOutBtn from "../signOutBtn/signOutBtn";
import SearchBar from "../searchBar/searchbar";
export default function NavbarComponent() {
  const menuItems = ["Profile", "Home", "Movies", "Shows", "Log Out"];
  const user = useSelector(selectCurrentUser);
  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <Link href="/">
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">Truffle</p>
          </NavbarBrand>
        </NavbarContent>
      </Link>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Link href="/">
          <NavbarBrand>
            <p className="font-bold text-inherit logo">Truffle</p>
          </NavbarBrand>
        </Link>
        <NavbarItem isActive>
          <Link color="foreground" href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/movies" color="foreground">
            Movies
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/shows">
            Shows
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/watchlist">
            Watchlist
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <NavbarItem>
            <SignOutBtn />
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <LoginBtn></LoginBtn>
            </NavbarItem>
            <NavbarItem>
              <RegisterBtn></RegisterBtn>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <SearchBar></SearchBar>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
