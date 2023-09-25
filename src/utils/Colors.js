export const colorShades = [
    "#FF0000", // Red
    "#FF5733", // Watermelon
    "#FF6347", // Tomato
    "#FF4500", // Orange Red
    "#FF8C69", // Salmon
    "#0000FF", // Blue
    "#4169E1", // Royal Blue
    "#00BFFF", // Deep Sky Blue
    "#1E90FF", // Dodger Blue
    "#87CEEB", // Sky Blue
    "#008000", // Green
    "#3CB371", // Medium Sea Green
    "#2E8B57", // Sea Green
    "#FFA500", // Orange
    "#800080", // Purple
    "#9400D3", // Dark Violet
    "#8A2BE2", // Blue Violet
    "#9370DB", // Medium Purple
    "#6A5ACD", // Slate Blue
    "#FFC0CB", // Pink
    "#FF1493", // Deep Pink
    "#C71585", // Medium Violet Red
    "#8B4513", // Saddle Brown
    "#A52A2A", // Brown
    "#D2691E", // Chocolate
    "#DEB887", // Burly Wood
    "#CD853F", // Peru
    "#808080", // Gray
    "#008080", // Teal
    "#00CED1", // Dark Turquoise
    "#008B8B", // Dark Cyan
    "#5F9EA0", // Cadet Blue
    "#FFA07A", // Light Salmon
  ];

  export const getRandomColor = () => {
    const randomNum = Math.floor(Math.random() * colorShades.length);
    //console.log(randomNum + " " + colorShades[randomNum])
    return colorShades[randomNum];
}