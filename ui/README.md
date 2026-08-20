# ui 
    * this is a ui build with react+js+tailwind 
    * it has a top bar which: 
        * theme selector 
        * has dark theme 
        * has option to choose the default theme but out of the box its dark (like a sun icon which transitions to a moon icon when the theme is switched to light)
    * it has a sidebar:
        *  palced on the left for displaying menues 
        * the menu options in the sidebar: 
            * dashboard
            * service map 
            * management: 
                * data generator: 
                    * this must opens a page  with 3 tabs
                    * logs , metrics , traces each having a tab 
                    * each tab contains management options like starting and stopping data generation and rate of generation 
                    * display generated data live on each tab
                    * generated data must be saved in .txt files in generators directory
                    * a button to start data generation for all tabs
            * anomaly explorer
            * settings: 
                * placed on the very buttom of the sidebar
