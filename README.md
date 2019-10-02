# Snakr

Snakr was created to solve a problem in the UCF CDL LS&T office soda fridge: no one knew how much soda was left, you had to visit our office to see if your preferred soda was in stock, and tracking debt was often a headache controlled by a white board and a permanently missing marker.

Snakr provides an easily updatable database of current, past, and future sodas, along with tracking individual users' debt through a firebase database.

## Users

### Admin

Admin users can add additional sodas to the stock, either a previously added item or a completely new item. Admin users also have general user permissions

### General

General users can update their profile and remove soda from from the stock.

## Dev

Snakr is hosted on Netlify at https://snakr.netlify.com/

This repo allows for deploy previews when a merge request is made, a link will display in the branch actions above the merge button of the request when the deploy has finished. This section will also have a link to the deploy log.

Snakr uses ReactJS.

To run, use `yarn start`
