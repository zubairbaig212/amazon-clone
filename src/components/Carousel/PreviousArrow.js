import { ArrowLeft } from "@mui/icons-material";

export const PreviousArrow = (props) => {
    const { className, style, previousSlide } = props;

    const prevSlider = (e) => {
        previousSlide(e);
    }
    return (
        <div
            className={`${className}`}
            style={{ ...style, }}
            onClick={prevSlider}
        >
            <ArrowLeft className={'previousArrow'} />
        </div>
    );
}