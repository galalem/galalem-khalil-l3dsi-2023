package com.ngx.schooling.services;

import com.ngx.schooling.entities.Session;
import com.ngx.schooling.requests.SessionRequest;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SessionServiceTests {

    @Test
    public void testCollide() {

        SessionRequest
            request1 = SessionRequest.builder().group(null).fortnight(null).build(),
            request2 = SessionRequest.builder().group(null).fortnight(true).build(),
            request3 = SessionRequest.builder().group(null).fortnight(false).build(),
            request4 = SessionRequest.builder().group(1).fortnight(null).build(),
            request5 = SessionRequest.builder().group(1).fortnight(true).build(),
            request6 = SessionRequest.builder().group(1).fortnight(false).build(),
            request7 = SessionRequest.builder().group(2).fortnight(null).build(),
            request8 = SessionRequest.builder().group(2).fortnight(true).build(),
            request9 = SessionRequest.builder().group(2).fortnight(false).build();

        Session
            session1 = Session.builder().group(null).fortnight(null).build(),
            session2 = Session.builder().group(null).fortnight(true).build(),
            session3 = Session.builder().group(null).fortnight(false).build(),
            session4 = Session.builder().group(1).fortnight(null).build(),
            session5 = Session.builder().group(1).fortnight(true).build(),
            session6 = Session.builder().group(1).fortnight(false).build(),
            session7 = Session.builder().group(2).fortnight(null).build(),
            session8 = Session.builder().group(2).fortnight(true).build(),
            session9 = Session.builder().group(2).fortnight(false).build();

        SessionService service = new SessionService();

        Assertions.assertTrue(service.isGroupAndFortnightCollide(session1, request1));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session1, request2));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session1, request3));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session1, request4));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session1, request5));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session1, request6));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session1, request7));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session1, request8));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session1, request9));

        Assertions.assertTrue(service.isGroupAndFortnightCollide(session2, request1));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session2, request2));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session2, request3));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session2, request4));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session2, request5));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session2, request6));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session2, request7));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session2, request8));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session2, request9));

        Assertions.assertTrue(service.isGroupAndFortnightCollide(session3, request1));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session3, request2));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session3, request3));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session3, request4));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session3, request5));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session3, request6));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session3, request7));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session3, request8));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session3, request9));

        Assertions.assertTrue(service.isGroupAndFortnightCollide(session4, request1));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session4, request2));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session4, request3));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session4, request4));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session4, request5));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session4, request6));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session4, request7));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session4, request8));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session4, request9));

        Assertions.assertTrue(service.isGroupAndFortnightCollide(session5, request1));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session5, request2));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session5, request3));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session5, request4));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session5, request5));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session5, request6));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session5, request7));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session5, request8));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session5, request9));

        Assertions.assertTrue(service.isGroupAndFortnightCollide(session6, request1));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session6, request2));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session6, request3));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session6, request4));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session6, request5));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session6, request6));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session6, request7));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session6, request8));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session6, request9));

        Assertions.assertTrue(service.isGroupAndFortnightCollide(session7, request1));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session7, request2));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session7, request3));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session7, request4));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session7, request5));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session7, request6));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session7, request7));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session7, request8));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session7, request9));

        Assertions.assertTrue(service.isGroupAndFortnightCollide(session8, request1));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session8, request2));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session8, request3));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session8, request4));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session8, request5));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session8, request6));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session8, request7));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session8, request8));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session8, request9));

        Assertions.assertTrue(service.isGroupAndFortnightCollide(session9, request1));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session9, request2));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session9, request3));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session9, request4));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session9, request5));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session9, request6));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session9, request7));
        Assertions.assertFalse(service.isGroupAndFortnightCollide(session9, request8));
        Assertions.assertTrue(service.isGroupAndFortnightCollide(session9, request9));
    }

}
