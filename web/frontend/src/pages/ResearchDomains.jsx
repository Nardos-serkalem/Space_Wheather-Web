import React from "react";

const Section = ({ id, title, imageSrc, imageAlt, intro, bullets, quote }) => (
	<section id={id} className="max-w-4xl mx-auto mb-16">
		<div className="flex items-start gap-6 mb-4">
			{imageSrc && (
				<div className="shrink-0 w-64 h-40 rounded-xl overflow-hidden shadow-md">
					<img src={imageSrc} alt={imageAlt || title} className="w-full h-full object-cover" loading="lazy" />
				</div>
			)}
			<h2 className="text-3xl font-bold text-[#2E5979]">{title}</h2>
		</div>
		<p className="text-gray-700 mb-4 whitespace-pre-line">{intro}</p>
		{bullets && bullets.length > 0 && (
			<ul className="list-disc pl-6 space-y-2 text-gray-800">
				{bullets.map((b, i) => (
					<li key={i}>{b}</li>
				))}
			</ul>
		)}
		{quote && (
			<p className="mt-4 italic text-gray-600">{quote}</p>
		)}
	</section>
);

const ResearchDomains = () => {
	return (
		<div className="min-h-screen bg-white text-gray-800 font-[Poppins]">
			<div className="bg-gradient-to-r from-[#2E5979] to-[#1e3a4f] text-white py-16">
				<div className="max-w-5xl mx-auto px-6 pt-12 md:pt-16">
					<h1 className="text-4xl font-extrabold">Research Domains</h1>
					<p className="opacity-90 mt-2">Explore our core domains and strategic objectives.</p>
				</div>
			</div>

			<main className="px-6 py-12">
				<Section
					id="ionospheric-studies"
					title="Ionospheric Studies"
					imageSrc="/r.domains/ionospheric%20studies.gif"
					imageAlt="Ionospheric studies"
					intro={
						"The ionosphere, a vital layer of Earth’s upper atmosphere, significantly influences communication, navigation, and satellite operations. A thorough understanding of its variability is therefore critical not only for scientific advancement but also for technological applications. Building on this foundation, the department pursues the following objectives:"
					}
					bullets={[
						"Investigate ionospheric dynamics under both quiet and disturbed geomagnetic conditions.",
						"Develop regional ionospheric models using GNSS-based Total Electron Content (TEC) measurements.",
						"Study traveling ionospheric disturbances (TIDs) and their coupling with atmospheric and magnetospheric processes.",
						"Enhance space weather monitoring and forecasting capabilities through advanced modeling."
					]}
				/>

				<Section
					id="geomagnetism"
					title="Geomagnetism"
					imageSrc="/r.domains/Geomagnetism.jpg"
					imageAlt="Geomagnetism"
					intro={
						"Variations in the geomagnetic field offer valuable insights into Earth’s interior dynamics and the interactions between the solar wind and the magnetosphere. To address these phenomena, the department focuses on:"
					}
					bullets={[
						"Monitoring long-term geomagnetic variations through ground-based observatories.",
						"Investigating storm-time magnetic disturbances and their global and regional impacts.",
						"Modeling geomagnetic responses to solar wind-magnetosphere interactions.",
						"Contributing regional observations to global geomagnetic reference models to support both fundamental and applied research."
					]}
					quote={"Exploring geomagnetic variations to understand Earth’s dynamics and solar wind interactions."}
				/>

				<Section
					id="space-weather"
					title="Space Weather"
					imageSrc="/r.domains/space%20weather.jpg"
					imageAlt="Space Weather"
					intro={
						"Space weather encompasses the dynamic conditions in Earth’s near-space environment driven by solar activity, which can disrupt critical technological systems. To mitigate these effects, the department works to:"
					}
					bullets={[
						"Characterize solar drivers of geomagnetic storms and substorms.",
						"Develop early-warning systems to protect GNSS operations and power grids.",
						"Quantify regional infrastructure vulnerabilities to space weather hazards.",
						"Collaborate with international space weather networks for real-time monitoring."
					]}
				/>

				<Section
					id="plasma-physics"
					title="Plasma Physics"
					imageSrc="/r.domains/plasma.jpg"
					intro={
						"Plasma, the universe’s most abundant state of matter, dominates environments such as the solar wind, magnetosphere, and ionosphere. Building on this understanding, research efforts include:"
					}
					bullets={[
						"Analyzing plasma instabilities and wave-particle interactions in geospace.",
						"Studying magnetosphere-ionosphere coupling using multi-instrument observations.",
						"Investigating plasma irregularities affecting satellite communications.",
						"Applying plasma theory and simulations to interpret observational data."
					]}
				/>

				<Section
					id="heliophysics"
					title="Heliophysics"
					imageSrc="/r.domains/heliophysics.jpg"
					intro={
						"Heliophysics examines the Sun and its influence throughout the solar system, essential for predicting space weather and safeguarding technology. The department’s work focuses on:"
					}
					bullets={[
						"Studying the generation and propagation of the solar wind through the heliosphere.",
						"Investigating solar flares, coronal mass ejections (CMEs), and their terrestrial impacts.",
						"Developing models of heliospheric magnetic field variability.",
						"Supporting regional and global heliophysics collaborations through observational data."
					]}
				/>

				<Section
					id="atmospheric-physics"
					title="Atmospheric Physics"
					imageSrc="/r.domains/atmospheric.jpg"
					intro={
						"The upper atmosphere mediates energy transfer from the Sun and space into the Earth system, linking space physics with climate and weather processes. To explore these interactions, the department aims to:"
					}
					bullets={[
						"Study atmospheric tides, waves, and their coupling with the ionosphere.",
						"Investigate thermospheric dynamics during geomagnetic storms.",
						"Model the role of the neutral atmosphere in ionosphere-plasmasphere interactions.",
						"Assess long-term atmospheric trends influenced by solar and geomagnetic activity."
					]}
				/>

				<Section
					id="planetary-science"
					title="Planetary Science"
					imageSrc="/r.domains/planetary.jpg"
					intro={
						"Planetary science expands the understanding of the solar system by investigating the physics, chemistry, and dynamics of planetary bodies beyond Earth. In line with this, the department:"
					}
					bullets={["Studies planetary ionospheres and magnetospheres using data from space missions."]}
				/>

				<div className="max-w-4xl mx-auto mt-10">
					<a href="/research" className="inline-block bg-[#E69D4A] text-black px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition">Back to Research</a>
				</div>
			</main>
		</div>
	);
};

export default ResearchDomains;


