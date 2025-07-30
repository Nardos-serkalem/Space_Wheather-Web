// Simulated async fetch functions

export async function fetchResearchList() {
    return new Promise((res) =>
      setTimeout(
        () =>
          res([
            { id: 1, title: "Research on Mars Atmosphere" },
            { id: 2, title: "Lunar Surface Analysis" },
          ]),
        500
      )
    );
  }
  
  export async function fetchEventsList() {
    return new Promise((res) =>
      setTimeout(
        () =>
          res([
            { id: 1, title: "2025 Space Exploration Conference" },
            { id: 2, title: "Solar Observation Workshop" },
          ]),
        500
      )
    );
  }
  