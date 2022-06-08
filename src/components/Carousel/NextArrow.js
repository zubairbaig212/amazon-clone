import { ArrowRight } from "@mui/icons-material";

export const NextArrow = (props) => {
    const { className, style, nextSlider } = props;
    const onNextSlider = () => {
        nextSlider();
    }
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onNextSlider}
        >
            <ArrowRight className={'previousArrow nextArrow'} />

        </div>
    );
}