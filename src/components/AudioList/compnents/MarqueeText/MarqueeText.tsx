import { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";

interface IMarqueeTextProps {
  text: string;
  width: number;
}

const MarqueeText = ({ text, width }: IMarqueeTextProps) => {
  const [textWidth, setTextWidth] = useState(0);

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!textWidth) return;

    translateX.setValue(width);

    Animated.loop(
      Animated.timing(translateX, {
        toValue: -textWidth,
        duration: 8000,
        useNativeDriver: true,
      }),
    ).start();
  }, [textWidth]);

  return (
    <View
      style={{
        width,
        overflow: "hidden",
      }}
    >
      <Animated.Text
        numberOfLines={1}
        onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        style={{
          color: "#d2cdcd",
          transform: [{ translateX }],
        }}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

export { MarqueeText };
