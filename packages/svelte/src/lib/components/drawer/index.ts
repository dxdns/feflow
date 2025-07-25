import DrawerComponent from "./Drawer.svelte"
import DrawerHeaderComponent from "./DrawerHeader.svelte"
import DrawerContentComponent from "./DrawerContent.svelte"
import DrawerOverlayComponent from "../overlay/Overlay.svelte"

type DrawerComponentType = typeof DrawerComponent & {
	Header: typeof DrawerHeaderComponent
	Content: typeof DrawerContentComponent
	Overlay: typeof DrawerOverlayComponent
}

const Drawer = DrawerComponent as any as DrawerComponentType
Drawer.Header = DrawerHeaderComponent
Drawer.Content = DrawerContentComponent
Drawer.Overlay = DrawerOverlayComponent

export { Drawer as default }
