import { useEvent } from "react-use";
import { useClick } from "~/hooks/use-sounds";

export default function Init(): null {
	const [play] = useClick();

	useEvent('mousedown', () => play());
	useEvent('mouseup', () => play());

    return null
}
