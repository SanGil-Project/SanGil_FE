import styled from "styled-components";

const Icon = (props) => {
  const {
    type,
    width,
    height,
    maxWidth,
    maxHeight,
    margin,
    _onClick,
    color,
    page,
  } = props;
  const styles = { width, height, maxWidth, maxHeight, margin };

  // console.log(page)
  const menuColor = page ? "#fff" : "#6F6F6F";

  if (type === "detailBtn") {
    return (
      <MenuIcon {...styles} viewBox="0 0 7 13" fill="none" onClick={_onClick}>
        <path
          d="M0.898454 12.1222L0.0817871 11.291L5.08387 6.2889L0.0817871 1.28682L0.898454 0.455566L6.73179 6.2889L0.898454 12.1222Z"
          fill="#989898"
        />
      </MenuIcon>
    );
  }

  if (type === "partyPeople") {
    return (
      <MenuIcon {...styles} viewBox="0 0 16 16" fill="none">
        <path
          d="M10.4692 7.13333C10.7567 7.13333 10.9973 7.03645 11.1911 6.8427C11.3848 6.64895 11.4817 6.40833 11.4817 6.12082C11.4817 5.83332 11.3848 5.5927 11.1911 5.39895C10.9973 5.2052 10.7567 5.10833 10.4692 5.10833C10.1817 5.10833 9.94106 5.2052 9.74731 5.39895C9.55356 5.5927 9.45669 5.83332 9.45669 6.12082C9.45669 6.40833 9.55356 6.64895 9.74731 6.8427C9.94106 7.03645 10.1817 7.13333 10.4692 7.13333ZM4.99419 7.13333C5.28169 7.13333 5.52231 7.03645 5.71606 6.8427C5.90981 6.64895 6.00669 6.40833 6.00669 6.12082C6.00669 5.83332 5.90981 5.5927 5.71606 5.39895C5.52231 5.2052 5.28169 5.10833 4.99419 5.10833C4.70669 5.10833 4.46606 5.2052 4.27231 5.39895C4.07856 5.5927 3.98169 5.83332 3.98169 6.12082C3.98169 6.40833 4.07856 6.64895 4.27231 6.8427C4.46606 7.03645 4.70669 7.13333 4.99419 7.13333ZM7.73169 12.2333C8.55669 12.2333 9.31606 12.0114 10.0098 11.5677C10.7036 11.124 11.2067 10.5208 11.5192 9.75833H10.5442C10.2567 10.2583 9.86294 10.6427 9.36294 10.9114C8.86294 11.1802 8.32544 11.3146 7.75044 11.3146C7.16294 11.3146 6.61606 11.1833 6.10981 10.9208C5.60356 10.6583 5.21294 10.2708 4.93794 9.75833H3.94419C4.26919 10.5208 4.77544 11.124 5.46294 11.5677C6.15044 12.0114 6.90669 12.2333 7.73169 12.2333ZM7.73169 15.6271C6.70669 15.6271 5.73794 15.4302 4.82544 15.0364C3.91294 14.6427 3.11606 14.1052 2.43481 13.424C1.75356 12.7427 1.21606 11.9458 0.822314 11.0333C0.428564 10.1208 0.231689 9.14583 0.231689 8.10833C0.231689 7.08333 0.428564 6.11458 0.822314 5.20208C1.21606 4.28958 1.75356 3.49583 2.43481 2.82083C3.11606 2.14583 3.91294 1.61145 4.82544 1.2177C5.73794 0.82395 6.71294 0.627075 7.75044 0.627075C8.77544 0.627075 9.74419 0.82395 10.6567 1.2177C11.5692 1.61145 12.3629 2.14583 13.0379 2.82083C13.7129 3.49583 14.2473 4.28958 14.6411 5.20208C15.0348 6.11458 15.2317 7.08958 15.2317 8.12708C15.2317 9.15207 15.0348 10.1208 14.6411 11.0333C14.2473 11.9458 13.7129 12.7427 13.0379 13.424C12.3629 14.1052 11.5692 14.6427 10.6567 15.0364C9.74419 15.4302 8.76919 15.6271 7.73169 15.6271ZM7.73169 14.5021C9.50669 14.5021 11.0129 13.8802 12.2504 12.6365C13.4879 11.3927 14.1067 9.88958 14.1067 8.12708C14.1067 6.35208 13.4879 4.84583 12.2504 3.60833C11.0129 2.37083 9.50669 1.75208 7.73169 1.75208C5.96919 1.75208 4.46606 2.37083 3.22231 3.60833C1.97856 4.84583 1.35669 6.35208 1.35669 8.12708C1.35669 9.88958 1.97856 11.3927 3.22231 12.6365C4.46606 13.8802 5.96919 14.5021 7.73169 14.5021Z"
          fill="#6F6F6F"
        />
      </MenuIcon>
    );
  }

  if (type === "partyDate") {
    return (
      <MenuIcon {...styles} viewBox="0 0 15 17" fill="none">
        <path
          d="M7.73186 9.7128C7.50721 9.7128 7.31891 9.63681 7.16694 9.48484C7.01497 9.33288 6.93898 9.14457 6.93898 8.91992C6.93898 8.69527 7.01497 8.50696 7.16694 8.35499C7.31891 8.20302 7.50721 8.12704 7.73186 8.12704C7.95651 8.12704 8.14482 8.20302 8.29679 8.35499C8.44876 8.50696 8.52474 8.69527 8.52474 8.91992C8.52474 9.14457 8.44876 9.33288 8.29679 9.48484C8.14482 9.63681 7.95651 9.7128 7.73186 9.7128ZM4.56035 9.7128C4.3357 9.7128 4.14739 9.63681 3.99542 9.48484C3.84345 9.33288 3.76747 9.14457 3.76747 8.91992C3.76747 8.69527 3.84345 8.50696 3.99542 8.35499C4.14739 8.20302 4.3357 8.12704 4.56035 8.12704C4.78499 8.12704 4.9733 8.20302 5.12527 8.35499C5.27724 8.50696 5.35322 8.69527 5.35322 8.91992C5.35322 9.14457 5.27724 9.33288 5.12527 9.48484C4.9733 9.63681 4.78499 9.7128 4.56035 9.7128ZM10.9034 9.7128C10.6787 9.7128 10.4904 9.63681 10.3385 9.48484C10.1865 9.33288 10.1105 9.14457 10.1105 8.91992C10.1105 8.69527 10.1865 8.50696 10.3385 8.35499C10.4904 8.20302 10.6787 8.12704 10.9034 8.12704C11.128 8.12704 11.3163 8.20302 11.4683 8.35499C11.6203 8.50696 11.6963 8.69527 11.6963 8.91992C11.6963 9.14457 11.6203 9.33288 11.4683 9.48484C11.3163 9.63681 11.128 9.7128 10.9034 9.7128ZM7.73186 12.8843C7.50721 12.8843 7.31891 12.8083 7.16694 12.6564C7.01497 12.5044 6.93898 12.3161 6.93898 12.0914C6.93898 11.8668 7.01497 11.6785 7.16694 11.5265C7.31891 11.3745 7.50721 11.2986 7.73186 11.2986C7.95651 11.2986 8.14482 11.3745 8.29679 11.5265C8.44876 11.6785 8.52474 11.8668 8.52474 12.0914C8.52474 12.3161 8.44876 12.5044 8.29679 12.6564C8.14482 12.8083 7.95651 12.8843 7.73186 12.8843ZM4.56035 12.8843C4.3357 12.8843 4.14739 12.8083 3.99542 12.6564C3.84345 12.5044 3.76747 12.3161 3.76747 12.0914C3.76747 11.8668 3.84345 11.6785 3.99542 11.5265C4.14739 11.3745 4.3357 11.2986 4.56035 11.2986C4.78499 11.2986 4.9733 11.3745 5.12527 11.5265C5.27724 11.6785 5.35322 11.8668 5.35322 12.0914C5.35322 12.3161 5.27724 12.5044 5.12527 12.6564C4.9733 12.8083 4.78499 12.8843 4.56035 12.8843ZM10.9034 12.8843C10.6787 12.8843 10.4904 12.8083 10.3385 12.6564C10.1865 12.5044 10.1105 12.3161 10.1105 12.0914C10.1105 11.8668 10.1865 11.6785 10.3385 11.5265C10.4904 11.3745 10.6787 11.2986 10.9034 11.2986C11.128 11.2986 11.3163 11.3745 11.4683 11.5265C11.6203 11.6785 11.6963 11.8668 11.6963 12.0914C11.6963 12.3161 11.6203 12.5044 11.4683 12.6564C11.3163 12.8083 11.128 12.8843 10.9034 12.8843ZM1.78527 16.0558C1.46811 16.0558 1.19061 15.9369 0.952743 15.699C0.714879 15.4612 0.595947 15.1837 0.595947 14.8665V2.57688C0.595947 2.25973 0.714879 1.98222 0.952743 1.74436C1.19061 1.50649 1.46811 1.38756 1.78527 1.38756H3.0737V0.198242H4.36213V1.38756H11.1016V0.198242H12.39V1.38756H13.6785C13.9956 1.38756 14.2731 1.50649 14.511 1.74436C14.7488 1.98222 14.8678 2.25973 14.8678 2.57688V14.8665C14.8678 15.1837 14.7488 15.4612 14.511 15.699C14.2731 15.9369 13.9956 16.0558 13.6785 16.0558H1.78527ZM1.78527 14.8665H13.6785V6.34306H1.78527V14.8665ZM1.78527 5.15374H13.6785V2.57688H1.78527V5.15374ZM1.78527 5.15374V2.57688V5.15374Z"
          fill="#6F6F6F"
        />
      </MenuIcon>
    );
  }

  if (type === "partyMountain") {
    return (
      <MenuIcon {...styles} viewBox="0 0 18 11" fill="none">
        <path
          d="M0.73169 10.0362C0.319667 10.0362 0.0844758 9.56582 0.331689 9.2362L4.24078 4.02408C4.44078 3.75741 4.84078 3.75741 5.04078 4.02408L8.47942 8.60893C8.57384 8.73483 8.72204 8.80893 8.87942 8.80893H14.2753C14.6876 8.80893 14.9227 8.33785 14.6748 8.00833L10.7674 2.81476C10.5675 2.54897 10.1685 2.54888 9.96846 2.81459L7.81123 5.67938L7.03396 4.65665L9.96797 0.750648C10.1681 0.484251 10.5678 0.484398 10.7677 0.750942L17.1317 9.2362C17.3789 9.56582 17.1437 10.0362 16.7317 10.0362H0.73169ZM2.18623 8.80893H7.09533L5.04078 6.06953C4.84078 5.80287 4.44078 5.80287 4.24078 6.06953L2.18623 8.80893ZM2.18623 8.80893H4.64078H7.09533H2.18623Z"
          fill="#6F6F6F"
        />
      </MenuIcon>
    );
  }

  if (type === "back") {
    return (
      <MenuIcon onClick={_onClick} {...styles} viewBox="0 0 24 25" fill="none">
        <path
          d="M10 22.5L0 12.5L10 2.5L11.4 3.925L2.825 12.5L11.4 21.075L10 22.5Z"
          fill={color}
        />
      </MenuIcon>
    );
  }

  if (type === "profileEdit") {
    return (
      <MenuIcon onClick={_onClick} {...styles} viewBox="0 0 21 21" fill="none">
        <rect width="21" height="21" rx="10.5" fill="#E8E8E8" />
        <path
          d="M10.5 13.3269C12.0613 13.3269 13.3269 12.0613 13.3269 10.5C13.3269 8.93875 12.0613 7.6731 10.5 7.6731C8.93875 7.6731 7.6731 8.93875 7.6731 10.5C7.6731 12.0613 8.93875 13.3269 10.5 13.3269Z"
          stroke="#6F6F6F"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.4444 12.5046C15.3555 12.7061 15.329 12.9297 15.3683 13.1464C15.4076 13.3632 15.5109 13.5632 15.6649 13.7207L15.705 13.7608C15.8293 13.8849 15.9279 14.0322 15.9951 14.1945C16.0624 14.3567 16.097 14.5306 16.097 14.7062C16.097 14.8818 16.0624 15.0557 15.9951 15.218C15.9279 15.3802 15.8293 15.5276 15.705 15.6517C15.5809 15.776 15.4335 15.8745 15.2713 15.9418C15.1091 16.009 14.9352 16.0436 14.7596 16.0436C14.5839 16.0436 14.41 16.009 14.2478 15.9418C14.0856 15.8745 13.9382 15.776 13.8141 15.6517L13.774 15.6116C13.6165 15.4576 13.4165 15.3542 13.1998 15.3149C12.983 15.2756 12.7594 15.3022 12.5579 15.3911C12.3603 15.4758 12.1917 15.6165 12.073 15.7957C11.9543 15.975 11.8906 16.1851 11.8897 16.4001V16.5137C11.8897 16.8681 11.7489 17.208 11.4983 17.4586C11.2477 17.7092 10.9078 17.85 10.5534 17.85C10.1989 17.85 9.85902 17.7092 9.60841 17.4586C9.35779 17.208 9.21699 16.8681 9.21699 16.5137V16.4535C9.21182 16.2324 9.14023 16.0179 9.01153 15.8379C8.88284 15.658 8.70298 15.5209 8.49536 15.4446C8.29382 15.3556 8.07026 15.3291 7.85351 15.3684C7.63675 15.4077 7.43674 15.511 7.27927 15.6651L7.23918 15.7052C7.11506 15.8294 6.96768 15.928 6.80545 15.9952C6.64321 16.0625 6.46932 16.0971 6.2937 16.0971C6.11808 16.0971 5.94418 16.0625 5.78195 15.9952C5.61972 15.928 5.47233 15.8294 5.34822 15.7052C5.22397 15.581 5.1254 15.4337 5.05815 15.2714C4.9909 15.1092 4.95628 14.9353 4.95628 14.7597C4.95628 14.5841 4.9909 14.4102 5.05815 14.2479C5.1254 14.0857 5.22397 13.9383 5.34822 13.8142L5.38831 13.7741C5.54235 13.6166 5.64569 13.4166 5.68499 13.1999C5.72429 12.9831 5.69776 12.7596 5.60881 12.558C5.52411 12.3604 5.38347 12.1918 5.2042 12.0731C5.02494 11.9544 4.81487 11.8907 4.59986 11.8898H4.48627C4.13184 11.8898 3.79193 11.749 3.54131 11.4984C3.2907 11.2478 3.1499 10.9079 3.1499 10.5535C3.1499 10.1991 3.2907 9.85914 3.54131 9.60853C3.79193 9.35791 4.13184 9.21712 4.48627 9.21712H4.5464C4.76757 9.21194 4.98206 9.14035 5.162 9.01166C5.34194 8.88296 5.47899 8.70311 5.55536 8.49548C5.6443 8.29394 5.67083 8.07039 5.63153 7.85363C5.59223 7.63688 5.4889 7.43686 5.33486 7.27939L5.29477 7.2393C5.17052 7.11518 5.07195 6.9678 5.0047 6.80557C4.93744 6.64334 4.90283 6.46944 4.90283 6.29382C4.90283 6.1182 4.93744 5.9443 5.0047 5.78207C5.07195 5.61984 5.17052 5.47245 5.29477 5.34834C5.41888 5.22409 5.56626 5.12552 5.7285 5.05827C5.89073 4.99102 6.06462 4.9564 6.24024 4.9564C6.41586 4.9564 6.58976 4.99102 6.75199 5.05827C6.91422 5.12552 7.06161 5.22409 7.18572 5.34834L7.22581 5.38843C7.38329 5.54247 7.5833 5.64581 7.80005 5.68511C8.01681 5.72441 8.24037 5.69788 8.4419 5.60893H8.49536C8.69298 5.52423 8.86153 5.38359 8.98025 5.20433C9.09897 5.02506 9.16268 4.81499 9.16354 4.59998V4.48639C9.16354 4.13196 9.30433 3.79205 9.55495 3.54144C9.80557 3.29082 10.1455 3.15002 10.4999 3.15002C10.8543 3.15002 11.1942 3.29082 11.4449 3.54144C11.6955 3.79205 11.8363 4.13196 11.8363 4.48639V4.54652C11.8371 4.76154 11.9008 4.97161 12.0196 5.15087C12.1383 5.33014 12.3068 5.47078 12.5044 5.55548C12.706 5.64442 12.9295 5.67096 13.1463 5.63165C13.3631 5.59235 13.5631 5.48902 13.7205 5.33498L13.7606 5.29489C13.8847 5.17064 14.0321 5.07207 14.1944 5.00482C14.3566 4.93757 14.5305 4.90295 14.7061 4.90295C14.8817 4.90295 15.0556 4.93757 15.2179 5.00482C15.3801 5.07207 15.5275 5.17064 15.6516 5.29489C15.7758 5.419 15.8744 5.56639 15.9417 5.72862C16.0089 5.89085 16.0435 6.06475 16.0435 6.24037C16.0435 6.41598 16.0089 6.58988 15.9417 6.75211C15.8744 6.91434 15.7758 7.06173 15.6516 7.18584L15.6115 7.22593C15.4575 7.38341 15.3541 7.58342 15.3148 7.80018C15.2755 8.01693 15.302 8.24049 15.391 8.44202V8.49548C15.4757 8.69311 15.6163 8.86165 15.7956 8.98037C15.9749 9.09909 16.1849 9.1628 16.3999 9.16366H16.5135C16.868 9.16366 17.2079 9.30446 17.4585 9.55507C17.7091 9.80569 17.8499 10.1456 17.8499 10.5C17.8499 10.8545 17.7091 11.1944 17.4585 11.445C17.2079 11.6956 16.868 11.8364 16.5135 11.8364H16.4534C16.2384 11.8372 16.0283 11.901 15.8491 12.0197C15.6698 12.1384 15.5291 12.3069 15.4444 12.5046V12.5046Z"
          stroke="#6F6F6F"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </MenuIcon>
    );
  }

  if (type === "nameEdit") {
    return (
      <MenuIcon {...styles} viewBox="0 0 17 16" fill="none">
        <path
          d="M1 15.5H6L16 5.5L11 0.5L1 10.5L1 15.5Z"
          stroke="#6F6F6F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 3.5L13 8.5" stroke="#6F6F6F" />
      </MenuIcon>
    );
  }

  if (type === "like") {
    return (
      <Like {...styles} x="0px" y="0px" viewBox="0 0 302.489 302.489">
        <path d="M302.351,98.012c-1.116-20.846-9.942-40.422-24.855-55.122c-15.103-14.887-34.811-23.086-55.491-23.086  c-30.776,0-53.082,24.334-65.065,37.408c-1.85,2.019-4.018,4.384-5.527,5.827c-1.208-1.25-2.845-3.114-4.351-4.828  c-10.944-12.466-33.72-38.406-66.571-38.406c-20.68,0-40.387,8.199-55.49,23.086C10.087,57.59,1.259,77.165,0.143,98.012  c-1.111,20.812,4.212,38.921,17.26,58.72c10.324,15.669,37.545,46.266,66.195,74.408c14.757,14.495,28.339,26.779,39.277,35.524  c17.762,14.2,24.565,16.021,28.506,16.021c3.695,0,10.683-1.657,28.615-15.981c10.913-8.717,24.448-20.982,39.143-35.468  c28.393-27.99,55.515-58.628,65.956-74.507C293.877,143.372,303.774,124.629,302.351,98.012z" />
      </Like>
    );
  }

  if (type === "rank") {
    return (
      <Rank {...styles} viewBox="0 0 31 29" fill="none">
        <rect
          y="-2"
          width="31"
          height="31"
          fill="url(#pattern0)"
          fillOpacity="0.3"
        />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use href="#image0_92_3722" transform="scale(0.00195312)" />
          </pattern>
          <image
            id="image0_92_3722"
            width="512"
            height="512"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA8CSURBVHic7dzLq65lHcbx32MOGnRAMDQtCxIkaBCK1CACNXQiCBLhX1DQLJpXNG7gRKh/oElNgiY7SEkaFCE0CDpgYGZFqUQORDp4N1jr0a37tNZ6zvf1+cCabFjvew9e7uvLs/d+h9ZasbxhGD5eVY9V1UNV9dGquqOqPlRVw3anAthUq6qXq+qvVfXnqvppVf2otfbClodKMQiAZQ3D8HBVfbuqPrP1WQAO4pdV9Y3W2k+2PkjPBMBChmG4u6q+V1UPbn0WgIN6uqq+0lp7fuuD9EgALGAYhger6odVdcvWZwE4uH9W1Rdba09vfZDe3LT1AXozDMMTVXWpjD/AHG6pqkundysz8gRgRsMw3F9Vz1bVe7c+C0Bn3qiqz7fWfrX1QXohAGYyDMOtVfXrqrpz67MAdOovVfXp1torWx+kB/4KYD7fKuMPsKQ76+SuZQaeAMxgGIZ7quo3VXXz1mcB6Nx/q+pTrbXfb32Qo/MEYB5fL+MPsIab6+TOZSJPACYahuGmOvkWq9u2PgtAiL9X1R2ttTe3PsiReQIw3WfL+AOs6bY6uXuZQABMd+/WBwAI5O6dSABMd/vWBwAI5O6dSABM50MIsD5370QCYLr3bX0AgEDu3okEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBI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"
          />
        </defs>
      </Rank>
    );
  }

  if (type === "arrow") {
    return (
      <Arrow {...styles} viewBox="0 0 5 8" fill="none">
        <path
          d="M0.614035 9.34039e-08L5 4L0.614035 8L-4.14667e-07 7.43L3.76097 4L1.85053e-07 0.57L0.614035 9.34039e-08Z"
          fill="black"
        />
      </Arrow>
    );
  }

  if (type === "feedIcon") {
    return (
      <MenuIcon {...styles} viewBox="0 0 36 36" fill="none">
        <rect
          x="4"
          y="6"
          width="28"
          height="24"
          rx="1"
          stroke={menuColor}
          strokeWidth="2"
        />
        <path
          d="M11 30L21.5057 13.1158C21.8549 12.5547 22.6426 12.4806 23.0903 12.9667L32 22.6404"
          stroke={menuColor}
          strokeWidth="2"
        />
        <rect
          x="9.35986"
          y="11.647"
          width="4.32"
          height="4.23529"
          rx="2.11765"
          stroke={menuColor}
          strokeWidth="2"
        />
      </MenuIcon>
    );
  }
  if (type === "partyIcon") {
    return (
      <MenuIcon {...styles} viewBox="0 0 36 36" fill="none">
        <path
          d="M18.0002 20.25C20.2822 20.25 22.2982 20.796 23.9362 21.51C25.4482 22.182 26.4002 23.694 26.4002 25.332V27.6H9.60019V25.346C9.60019 23.694 10.5522 22.182 12.0642 21.524C13.7022 20.796 15.7182 20.25 18.0002 20.25ZM6.80019 20.6C8.34019 20.6 9.60019 19.34 9.60019 17.8C9.60019 16.26 8.34019 15 6.80019 15C5.26019 15 4.00019 16.26 4.00019 17.8C4.00019 19.34 5.26019 20.6 6.80019 20.6ZM8.38219 22.14C7.86419 22.056 7.34619 22 6.80019 22C5.41419 22 4.09819 22.294 2.9082 22.812C1.8722 23.26 1.2002 24.268 1.2002 25.402V27.6H7.50019V25.346C7.50019 24.184 7.82219 23.092 8.38219 22.14ZM29.2002 20.6C30.7402 20.6 32.0002 19.34 32.0002 17.8C32.0002 16.26 30.7402 15 29.2002 15C27.6602 15 26.4002 16.26 26.4002 17.8C26.4002 19.34 27.6602 20.6 29.2002 20.6ZM34.8002 25.402C34.8002 24.268 34.1282 23.26 33.0922 22.812C31.9022 22.294 30.5862 22 29.2002 22C28.6542 22 28.1362 22.056 27.6182 22.14C28.1782 23.092 28.5002 24.184 28.5002 25.346V27.6H34.8002V25.402ZM18.0002 10.8C20.3242 10.8 22.2002 12.676 22.2002 15C22.2002 17.324 20.3242 19.2 18.0002 19.2C15.6762 19.2 13.8002 17.324 13.8002 15C13.8002 12.676 15.6762 10.8 18.0002 10.8Z"
          fill={menuColor}
        />
      </MenuIcon>
    );
  }
  if (type === "homeIcon") {
    return (
      <MenuIcon {...styles} viewBox="0 0 36 36" fill="none">
        <path
          d="M31.3453 14.4637L22.2433 5.35501C21.1168 4.23112 19.5909 3.60001 18.0001 3.60001C16.4093 3.60001 14.8834 4.23112 13.7569 5.35501L4.65491 14.4637C4.31942 14.7972 4.05344 15.1941 3.87237 15.6312C3.69131 16.0684 3.59877 16.5372 3.60011 17.0104V28.7978C3.60011 29.7532 3.9794 30.6694 4.65453 31.345C5.32966 32.0205 6.24533 32.4 7.20011 32.4H28.8001C29.7549 32.4 30.6705 32.0205 31.3457 31.345C32.0208 30.6694 32.4001 29.7532 32.4001 28.7978V17.0104C32.4014 16.5372 32.3089 16.0684 32.1278 15.6312C31.9468 15.1941 31.6808 14.7972 31.3453 14.4637ZM21.6001 29.9986H14.4001V25.2749C14.4001 24.3196 14.7794 23.4034 15.4545 22.7278C16.1296 22.0523 17.0453 21.6728 18.0001 21.6728C18.9549 21.6728 19.8705 22.0523 20.5457 22.7278C21.2208 23.4034 21.6001 24.3196 21.6001 25.2749V29.9986ZM30.0001 28.7978C30.0001 29.1163 29.8737 29.4217 29.6486 29.6469C29.4236 29.8721 29.1183 29.9986 28.8001 29.9986H24.0001V25.2749C24.0001 23.6827 23.368 22.1556 22.2427 21.0298C21.1175 19.9039 19.5914 19.2713 18.0001 19.2713C16.4088 19.2713 14.8827 19.9039 13.7575 21.0298C12.6322 22.1556 12.0001 23.6827 12.0001 25.2749V29.9986H7.20011C6.88185 29.9986 6.57662 29.8721 6.35158 29.6469C6.12654 29.4217 6.00011 29.1163 6.00011 28.7978V17.0104C6.00122 16.6922 6.12754 16.3872 6.35171 16.1615L15.4537 7.05643C16.1301 6.38274 17.0457 6.00453 18.0001 6.00453C18.9545 6.00453 19.8701 6.38274 20.5465 7.05643L29.6485 16.1651C29.8718 16.3899 29.998 16.6934 30.0001 17.0104V28.7978Z"
          fill={menuColor}
        />
      </MenuIcon>
    );
  }

  if (type === "searchIcon") {
    return (
      <MenuIcon {...styles} viewBox="0 0 37 37" fill="none">
        <path
          d="M23.3 23.3L31.7001 31.7"
          stroke="#B5B5B5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse
          cx="16.3001"
          cy="16.3"
          rx="9.8"
          ry="9.8"
          transform="rotate(90 16.3001 16.3)"
          stroke="#B5B5B5"
          strokeWidth="2.5"
        />
      </MenuIcon>
    );
  }

  if (type === "mountain") {
    return (
      <MenuIcon {...styles} viewBox="0 0 41 24" fill="none">
        <path
          d="M1.2399 23.0806C0.415855 23.0806 -0.0545286 22.1398 0.439899 21.4806L9.9399 8.8139C10.3399 8.28057 11.1399 8.28057 11.5399 8.8139L19.7836 19.8056C19.9725 20.0574 20.2689 20.2056 20.5836 20.2056H35.6566L24.9553 5.98182C24.5554 5.45022 23.7575 5.45006 23.3574 5.98148L18.167 12.8743L16.3461 10.4785L23.3564 1.14583C23.7566 0.613033 24.5561 0.613327 24.9559 1.14641L40.2066 21.4806C40.701 22.1398 40.2306 23.0806 39.4066 23.0806H1.2399ZM4.9899 20.2056H16.4899L11.5399 13.6056C11.1399 13.0722 10.3399 13.0722 9.9399 13.6056L4.9899 20.2056ZM4.9899 20.2056H10.7399H16.4899H4.9899Z"
          fill={menuColor}
        />
      </MenuIcon>
    );
  }

  if (type === "mypageIcon") {
    return (
      <MenuIcon {...styles} viewBox="0 0 36 36" fill="none">
        <circle
          cx="18.2998"
          cy="18.3"
          r="13.5"
          transform="rotate(90 18.2998 18.3)"
          stroke={menuColor}
          strokeWidth="2"
        />
        <path
          d="M18.2998 21.3C12.8033 21.3 8.56568 24.447 7.89311 26.7049C7.7804 27.0833 7.91454 27.4743 8.17472 27.7713C9.18581 28.9255 12.3056 31.8 18.2998 31.8C24.294 31.8 27.4138 28.9255 28.4249 27.7713C28.6851 27.4743 28.8192 27.0833 28.7065 26.7049C28.0339 24.447 23.7963 21.3 18.2998 21.3Z"
          fill={menuColor}
        />
        <ellipse cx="18.2998" cy="15.3" rx="4.5" ry="4.5" fill={menuColor} />
      </MenuIcon>
    );
  }

  if (type === "find") {
    return (
      <Find {...styles} viewBox="0 0 37 36" fill="none">
        <path
          d="M22.8716 22.8L31.2716 31.2"
          stroke="#B5B5B5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse
          cx="15.8719"
          cy="15.8"
          rx="9.8"
          ry="9.8"
          transform="rotate(90 15.8719 15.8)"
          stroke="#B5B5B5"
          strokeWidth="2.5"
        />
      </Find>
    );
  }

  if (type === "delete") {
    return (
      <Delete {...styles} onClick={_onClick} viewBox="0 0 15 16" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.833496 3.99996C0.833496 3.63177 1.13197 3.33329 1.50016 3.33329H13.5002C13.8684 3.33329 14.1668 3.63177 14.1668 3.99996C14.1668 4.36815 13.8684 4.66663 13.5002 4.66663H1.50016C1.13197 4.66663 0.833496 4.36815 0.833496 3.99996Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.16683 1.99996C5.99002 1.99996 5.82045 2.0702 5.69543 2.19522C5.5704 2.32025 5.50016 2.48982 5.50016 2.66663V3.33329H9.50016V2.66663C9.50016 2.48982 9.42992 2.32025 9.3049 2.19522C9.17988 2.0702 9.01031 1.99996 8.8335 1.99996H6.16683ZM10.8335 3.33329V2.66663C10.8335 2.13619 10.6228 1.62748 10.2477 1.25241C9.87264 0.87734 9.36393 0.666626 8.8335 0.666626H6.16683C5.6364 0.666626 5.12769 0.87734 4.75262 1.25241C4.37754 1.62748 4.16683 2.13619 4.16683 2.66663V3.33329H2.8335C2.46531 3.33329 2.16683 3.63177 2.16683 3.99996V13.3333C2.16683 13.8637 2.37754 14.3724 2.75262 14.7475C3.12769 15.1226 3.6364 15.3333 4.16683 15.3333H10.8335C11.3639 15.3333 11.8726 15.1226 12.2477 14.7475C12.6228 14.3724 12.8335 13.8637 12.8335 13.3333V3.99996C12.8335 3.63177 12.535 3.33329 12.1668 3.33329H10.8335ZM3.50016 4.66663V13.3333C3.50016 13.5101 3.5704 13.6797 3.69543 13.8047C3.82045 13.9297 3.99002 14 4.16683 14H10.8335C11.0103 14 11.1799 13.9297 11.3049 13.8047C11.4299 13.6797 11.5002 13.5101 11.5002 13.3333V4.66663H3.50016Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.16683 6.66663C6.53502 6.66663 6.8335 6.9651 6.8335 7.33329V11.3333C6.8335 11.7015 6.53502 12 6.16683 12C5.79864 12 5.50016 11.7015 5.50016 11.3333V7.33329C5.50016 6.9651 5.79864 6.66663 6.16683 6.66663Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.8335 6.66663C9.20169 6.66663 9.50016 6.9651 9.50016 7.33329V11.3333C9.50016 11.7015 9.20169 12 8.8335 12C8.46531 12 8.16683 11.7015 8.16683 11.3333V7.33329C8.16683 6.9651 8.46531 6.66663 8.8335 6.66663Z"
          fill="black"
        />
      </Delete>
    );
  }

  if (type === "plus") {
    return (
      <Plus viewBox="0 0 15 15" fill="none" {...styles}>
        <path
          d="M6.29883 14.5645H8.67188V8.88086H14.3555V6.50781H8.67188V0.853516H6.29883V6.50781H0.644531V8.88086H6.29883V14.5645Z"
          fill="white"
        />
      </Plus>
    );
  }

  if (type === "climber") {
    return (
      <Climber viewBox="0 0 21 34" fill="none" {...styles}>
        <path
          d="M12.428 6.22634C11.678 6.22634 11.0342 5.95759 10.4967 5.42009C9.95924 4.88259 9.69049 4.23884 9.69049 3.48884C9.69049 2.73884 9.95924 2.09509 10.4967 1.55759C11.0342 1.02009 11.678 0.75134 12.428 0.75134C13.178 0.75134 13.8217 1.02009 14.3592 1.55759C14.8967 2.09509 15.1655 2.73884 15.1655 3.48884C15.1655 4.23884 14.8967 4.88259 14.3592 5.42009C13.8217 5.95759 13.178 6.22634 12.428 6.22634ZM3.128 33.0013L7.66549 9.75134C7.79049 9.15134 8.07799 8.68884 8.52799 8.36384C8.97799 8.03884 9.45299 7.87634 9.95299 7.87634C10.453 7.87634 10.9217 7.98884 11.3592 8.21384C11.7967 8.43884 12.153 8.76384 12.428 9.18884L13.8905 11.5888C14.3655 12.3888 15.0217 13.1013 15.8592 13.7263C16.6967 14.3513 17.678 14.8388 18.803 15.1888V12.3763H20.303V33.0013H18.803V17.4763C17.528 17.2013 16.328 16.7138 15.203 16.0138C14.078 15.3138 13.078 14.4513 12.203 13.4263L11.1155 18.8638L14.303 21.9013V33.0013H12.053V23.8513L8.30299 20.2888L5.52799 33.0013H3.128ZM3.76549 17.8888L5.64049 8.36384L4.29049 8.10134C3.56549 7.97634 2.903 8.10759 2.303 8.49509C1.703 8.88259 1.3405 9.43884 1.2155 10.1638L0.0904965 16.0513C0.0404966 16.3263 0.109246 16.6013 0.296746 16.8763C0.484246 17.1513 0.702996 17.3138 0.952996 17.3638L3.76549 17.8888Z"
          fill="white"
        />
      </Climber>
    );
  }

  return (
    <Vector
      {...styles}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill="white" />
      <path
        d="M20 13.9C21.16 13.9 22.1 14.84 22.1 16C22.1 17.16 21.16 18.1 20 18.1C18.84 18.1 17.9 17.16 17.9 16C17.9 14.84 18.84 13.9 20 13.9ZM20 22.9C22.97 22.9 26.1 24.36 26.1 25V26.1H13.9V25C13.9 24.36 17.03 22.9 20 22.9ZM20 12C17.79 12 16 13.79 16 16C16 18.21 17.79 20 20 20C22.21 20 24 18.21 24 16C24 13.79 22.21 12 20 12ZM20 21C17.33 21 12 22.34 12 25V28H28V25C28 22.34 22.67 21 20 21Z"
        fill="black"
      />
    </Vector>
  );
};

Icon.defaultProps = {
  _onClick: () => {},
  page: "#6F6F6F",
};

const Climber = styled.svg`
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  max-height: ${(props) => `${props.maxHeight}`};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
`;

const Plus = styled.svg`
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  max-height: ${(props) => `${props.maxHeight}`};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
`;

const Delete = styled.svg`
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  max-height: ${(props) => `${props.maxHeight}`};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
`;

const Find = styled.svg`
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  max-height: ${(props) => `${props.maxHeight}`};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
`;

const Like = styled.svg`
  fill: #6f6f6f;
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  max-height: ${(props) => `${props.maxHeight}`};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  &:hover {
    cursor: pointer;
    fill: #e54353;
  }
`;

const Rank = styled.svg`
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  max-height: ${(props) => `${props.maxHeight}`};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
`;

const Vector = styled.svg`
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  max-height:${(props) => `${props.maxHeight}`}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  border-radius: 100%;
`;

const Arrow = styled.svg`
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  max-height: ${(props) => `${props.maxHeight}`}
    ${(props) => (props.margin ? `margin: ${props.margin};` : null)};
`;

const MenuIcon = styled.svg`
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  &:hover {
    cursor: pointer;
  }
`;

const Mountain = styled.svg``;

export default Icon;
