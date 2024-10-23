import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import pr from "../../img/logos/pr.png";
import marketing from "../../img/logos/marketing.png";
import data from "../../img/logos/data.png";
import dj from "../../img/logos/dj.png";
import chair from "../../img/logos/chair.png";
import party from "../../img/logos/party.png";
import lips from "../../img/logos/lips.png";
import queen from "../../img/logos/queen.png";
import harness from "../../img/logos/harness.png";

import { pageStore } from "../../store/pageStore/pageStore";

import "./CarouselElement.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 20;

export const CarouselElement = (props) => {
  const { id } = props;
  const [showAll, setShowAll] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (throttling.current === false) {
      throttling.current = true;
      if (isLeftSwipe) {
        pageStore.setCarouselNext();
      } else if (isRightSwipe) {
        pageStore.setCarouselPrevious();
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  const resizeHandler = () => {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth > 725) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      document.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

  if (showAll) {
    return <AllThreeElement />;
  } else if (id === 1) {
    return (
      <LegalElement
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    );
  } else if (id === 2) {
    return (
      <EventElement
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    );
  } else if (id === 3) {
    return (
      <PartiesElement
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    );
  }
};

const LegalElement = (props) => {
  const { onTouchStart, onTouchMove, onTouchEnd } = props;
  const { t } = useTranslation();
  return (
    <div
      className="main__element"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={() => onTouchEnd()}
    >
      <div className="title">Zu unseren Leistungen gehören</div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={pr} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">PR & Kommunikation</div>
          Wir stehen unseren Partnern beratend zur Seite und übernehmen auch die
          komplette Kommunikation.
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={marketing} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Marketing & Werbung</div>
          Von online Werbung bis hin zu Streuartikel haben wir deine Marke im
          Griff
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={data} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Daten- & Jugendschutz</div>
          Wir kümmern uns darum, damit du ruhig schlafen kannst
        </div>
      </div>
    </div>
  );
};

const EventElement = (props) => {
  const { onTouchStart, onTouchMove, onTouchEnd } = props;
  const { t } = useTranslation();
  return (
    <div
      className="main__element"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={() => onTouchEnd()}
    >
      <div className="title">
        Zusätzlich bieten wir Live-Events und Eventmanagement an
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={party} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Einlasskontrolle</div>
          Ein erfahrenes Team an deiner Tür
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={chair} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Spielmöbel</div>
          Miete, einzelne Spielmöbel oder ganze Pop-up Dungeons
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={dj} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">DJ</div>
          Die passende Musik für deine Party
        </div>
      </div>
    </div>
  );
};

const PartiesElement = (props) => {
  const { onTouchStart, onTouchMove, onTouchEnd } = props;
  const { t } = useTranslation();
  return (
    <div
      className="main__element"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={() => onTouchEnd()}
    >
      <div className="title">Unsere Events</div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={queen} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Damenwahl</div>
          FemDom Spieleabend
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={lips} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Erotic Art</div>
          Love to Love
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={harness} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Harness Madness</div>
          Hedonist*innen im Harness
        </div>
      </div>
    </div>
  );
};

const AllThreeElement = () => {
  const { t } = useTranslation();
  return (
    <div className="main__element">
      <div className="title">Zu unseren Leistungen gehören</div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={pr} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">PR & Kommunikation</div>
          Wir stehen unseren Partnern beratend zur Seite und übernehmen auch die
          komplette Kommunikation.
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={marketing} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Marketing & Werbung</div>
          Von online Werbung bis hin zu Streuartikel haben wir deine Marke im
          Griff
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={data} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Daten- & Jugendschutz</div>
          Wir kümmern uns darum, damit du ruhig schlafen kannst
        </div>
      </div>
      <div className="title">
        Zusätzlich bieten wir Live-Events und Eventmanagement an
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={party} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Einlasskontrolle</div>
          Ein erfahrenes Team an deiner Tür
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={chair} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Spielmöbel</div>
          Miete, einzelne Spielmöbel oder ganze Pop-up Dungeons
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={dj} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">DJ</div>
          Die passende Musik für deine Party
        </div>
      </div>
      <div className="title">Unsere Events</div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={queen} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Damenwahl</div>
          FemDom Spieleabend
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={lips} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Erotic Art</div>
          Love to Love
        </div>
      </div>
      <div className="bulle">
        <div className="imgcontainer">
          <img src={harness} style={{ width: 100 }} />
        </div>
        <div className="textcontainer">
          <div className="textcontainertitle">Harness Madness</div>
          Hedonist*innen im Harness
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};
