import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import useWrapperIntl from "@/locales/useWrapperIntl";

import { PullRadioBox } from "@components/UI-kit";
import BoxCard from "./BoxCard";

const BoxsWrapper = styled.div`
	width: 1100px;
	flex: 1;
	margin: 0 auto;
	margin-bottom: 30px;

	.toolBar {
		width: 1100px;
		height: 62px;
		margin-top: 40px;
		margin-bottom: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// border-bottom: 2px solid rgba(0, 0, 0, 0.1);

		.nav_wrapper {
			display: flex;

			li {
				padding: 7px 20px;
				height: 48px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				user-select: none;
				opacity: 0.4;
				img {
					margin-right: 7.15px;
				}

				&.active {
					background-color: rgba(0, 0, 0, 0.1);
					opacity: 1;
				}
			}
			.link {
				position: absolute;
				right: -20px;
			}
		}

		.filterGroup {
			width: fit-content;
			/* margin-bottom: 50px; */
			display: flex;
			justify-content: space-between;
		}
	}

	.boxsCardsList {
		display: grid;
		grid-template-columns: 1100px;
	}
`;

function Boxs() {
	const { wrapperIntl } = useWrapperIntl();

	const history = useHistory();
	const { boxsType } = useParams();

	const NavList = [
		{
			/* title: wrapperIntl("market.HottestBox"), */
			title: "Hotest Boxs",
			route: "Hottest",
			// channelRequestParam: "FineArts",
		},
		{
			/* title: wrapperIntl("market.sports"), */
			title: "Previous Boxs",
			route: "Previous",
			// channelRequestParam: "Sports",
		},
	];

	return (
		<BoxsWrapper>
			<div className="toolBar">
				<ul className="nav_wrapper">
					{NavList.map((nav) => {
						return (
							<li
								key={nav.title}
								className={
									boxsType === nav.route ? "active" : ""
								}
								onClick={() => {
									// setChannelRequestParam(nav.channelRequestParam);
									history.push("/Boxs/" + nav.route);
								}}
							>
								<p className="flex flex-center-y">
									{nav.title}
								</p>
							</li>
						);
					})}
				</ul>

				<div className="filterGroup">
					<PullRadioBox
						className="liveStatus_dropdown"
						prefix={"Sort by："}
						width={"205px"}
						options={[{ value: "Live" }, { value: "Coming soon" }]}
						defaultValue="Live"
						onChange={(option) => {
							console.log("option: ", option);
						}}
					/>
				</div>
			</div>

			<div className="boxsCardsList">
				<BoxCard/>
			</div>
		</BoxsWrapper>
	);
}

export default Boxs;
