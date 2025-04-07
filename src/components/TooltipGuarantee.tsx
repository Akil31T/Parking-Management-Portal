import React from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";

const HoverPopover = () => {
    const popover = (
        <Popover id="popover-hover">
            <div className="d-flex align-items-center gap-2">
            <img src="/images/right.svg"/>
            <Popover.Body>
                Your space is for you and only you to use for the duration of your booking.
                Your space owner knows this.
            </Popover.Body>
            </div>
        </Popover>
    );

    return (
        <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="bottom"
            overlay={popover}
        >
            <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
        <img src="/images/right.svg" alt="info icon" />
        <span className="text-success fw-semibold">Space availability guarantee</span>
      </div>
        </OverlayTrigger>
    );
};

export default HoverPopover;
