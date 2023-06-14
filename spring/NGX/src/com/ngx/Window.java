package com.ngx;

import com.ngx.components.*;

import java.awt.*;
import java.io.IOException;
import java.net.URL;
import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.plaf.basic.BasicProgressBarUI;


public class Window extends JPanel {

    private final JLabel label = new JLabel("Loading");
    private final JProgressBar progressBar = new JProgressBar(SwingConstants.HORIZONTAL, 0, 100);

    private String message = "Hello world";
    private int dots = 0;


    private final Timer dotTimer = new Timer(300, e -> {
        dots = (dots + 1) % 4;
        label.setText(getMessage());
    });

    public static Window open() throws IOException {
        Window window = new Window();

        JFrame frame = new JFrame();
        frame.setIconImage(Toolkit.getDefaultToolkit().getImage(getImageResource("/favicon.png")));
        frame.setSize(600, 350);
        frame.add(window);
        frame.setLocationRelativeTo(null);
        frame.setUndecorated(true);
        frame.getRootPane().setWindowDecorationStyle(JRootPane.NONE);
        frame.setVisible(true);
        return window;
    }

    public Window() throws IOException {

        setLayout(new BorderLayout());

        BackgroundPanel background = new BackgroundPanel(ImageIO.read(getImageResource("/images/background.jpg")));
        background.setBorder(new EmptyBorder(50, 50, 50, 50));
        background.setLayout(new GridBagLayout());
        add(background);

        GridBagConstraints gridBagConstraints = new GridBagConstraints();
        gridBagConstraints.gridx = 0;
        gridBagConstraints.gridy = 0;
        gridBagConstraints.weightx = 1;
        gridBagConstraints.weighty = 3;
        gridBagConstraints.anchor = GridBagConstraints.NORTH;

        JLabel logo = new JLabel(new ImageIcon(getImageResource("/images/logo.png")));
        background.add(logo, gridBagConstraints);



        gridBagConstraints = new GridBagConstraints();
        gridBagConstraints.gridx = 0;
        gridBagConstraints.gridy = 1;
        gridBagConstraints.weightx = 1;
        gridBagConstraints.weighty = 1;
        gridBagConstraints.anchor = GridBagConstraints.SOUTH;
        gridBagConstraints.fill = GridBagConstraints.HORIZONTAL;

        label.setForeground(Color.WHITE);
        label.setFont(new Font("Arial", Font.PLAIN, 20));
        background.add(label, gridBagConstraints);



        gridBagConstraints = new GridBagConstraints();
        gridBagConstraints.gridx = 0;
        gridBagConstraints.gridy = 2;
        gridBagConstraints.weightx = 1;
        gridBagConstraints.weighty = 1;
        gridBagConstraints.fill = GridBagConstraints.BOTH;

        JPanel progressPanel = new JPanel();
        progressPanel.setLayout(new BorderLayout());
        progressPanel.setBorder(new EmptyBorder(20, 0, 0, 0));
        progressPanel.setOpaque(false);
        background.add(progressPanel, gridBagConstraints);

        TranslucentPanel progressBackground = new TranslucentPanel();
        progressBackground.setLayout(new BorderLayout());
        progressBackground.setBackground(Color.WHITE);
        progressBackground.setAlpha(0.2f);
        progressBackground.add(progressBar);
        progressPanel.add(progressBackground);

        progressBar.setStringPainted(true);
        progressBar.setBorderPainted(false);
        progressBar.setValue(0);
        progressBar.setMinimumSize(new Dimension(100, 30));
        progressBar.setOpaque(false);
        progressBar.setForeground(Color.WHITE);
        progressBar.setFont(new Font("monospace", Font.PLAIN, 16));
        progressBar.setUI(new BasicProgressBarUI() {
            protected Color getSelectionBackground() {
                return new Color(53, 15, 126);
            }
            protected Color getSelectionForeground() {
                return new Color(0x6f, 0x42, 0xc1);
            }
        });
    }

    @Override
    public void addNotify() {
        super.addNotify();
        dotTimer.start();
    }

    @Override
    public void removeNotify() {
        super.removeNotify();
        dotTimer.stop();
    }

    public void setMessage(String message) {
        this.message = message;
        label.setText(getMessage());
    }

    public void setProgress(int progress) {
        progressBar.setValue(progress);
    }

    private String getMessage() {
        return this.message + new String(new char[this.dots]).replace("\0", ".");
    }

    public static URL getImageResource(String resource) {
        return Window.class.getResource(resource);
    }

}
