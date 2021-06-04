
const Layout = (props: any) => {
    return (
        <>
            <header>MainNavigation</header>
            <main>{props.children}</main>
            <footer>Footer</footer>
        </>
    );
}

export default Layout;