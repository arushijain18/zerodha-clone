import React from "react";
import{render,screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Hero from "../home/Hero";

// test suite
// you can give multiple test cases in this 

describe('Hero Component',() =>{
test('renders hero image',()=>{
    render(<Hero/>);
    const heroImage = screen.getByAltText("Hero Image");
    expect(heroImage).toBeInTheDocument();
   expect(heroImage).toHaveAttribute("src", "media/images/homeHero.png");
});
});